package service

import database.*
import job.Todo
import message.Message
import message.SignInfo
import message.SignResponse
import message.SignResult
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestParam
import store.Cache
import tools.Md5
import java.sql.Timestamp
import java.util.*
import kotlin.collections.ArrayList

@Suppress("UNCHECKED_CAST")
@Service
class StudentService : CommonService() {

    @Autowired
    lateinit var studentRepo: StudentRepo
    @Autowired
    lateinit var recordRepo: AttendRecRepo
    @Autowired
    lateinit var lessonRepo: LessonRepo

    @Autowired
    lateinit var cache: Cache
    @Autowired
    lateinit var todo: Todo

    fun svrKey(id: Short): String? = cache.svrKeyMap[id]

    /**
     * @author ourfor
     * @param addr Each Bluetooth BR/EDR device has a unique 48-bit MAC address known as the BD_ADDR
     * @param studId Student Identifiers
     */
    fun add(@RequestParam addr: String, @RequestParam studId: String?): Map<String,Any?> {
        // use Bluetooth as password
        val student = when (studId) {
            // if studId is null, maybe second use
            null -> {
                studentRepo.findByMAC(addr)
            }
            else -> {
                // first use: MAC is unknown
                val student = studentRepo.findByStuID(studId)
                student?:studentRepo.findByMAC(addr)
            }
        }

        log.info(student)

        val result: Map<String,Any?>

        if(student == null) {
            // can't find the student
            log.error("can't find the student in database")
            result = mapOf(
                    "stuName" to "undefined",
                    "classId" to "unknown",
                    "siteNo" to "undefined",
                    "BMac" to "undefined"
            )
        } else {
            if(student.MAC?.trim()=="unknown") {
                // first use system
                student.MAC = addr.replace("-","").replace(":","")
                log.info("bluetooth address: $addr")
                // change password by using web client, set default here
                val buffer = Md5.md5HexBuff(addr,student.stuID!!)
                student.passwdHash = buffer?.insert(8,'-')
                                    ?.insert(13,"-")
                                    ?.insert(18,'-')
                                    ?.insert(23,'-').toString()
                log.info(student)
                studentRepo.save(student)

            }


            result = mapOf(
                    "stuId" to student.stuID,
                    "stuName" to student.stuName,
                    "classId" to student.classID,
                    "siteNo" to student.siteNo,
                    "BMac" to student.MAC
            )
        }

        return result
    }

    fun addAll(students: List<SignInfo>,sign: String,id: Short): Message {
        val msg = Message()
        val succList = ArrayList<Map<String,Any?>>()
        val failList = ArrayList<SignInfo>()
        students.forEach {
            (MAC,studId,distance) ->
            val result = add(MAC,studId)
            if(result["stuName"]!="undefined") succList.add(result)
            else failList.add(SignInfo(MAC,studId,distance))
        }


        val now = Date().time
        val refreshTime = Timestamp(now)
        log.info(refreshTime)
        // get record between this time
        // find those record that this device with this id can sign in
        val recs = recordRepo.findRecLimitTime(refreshTime,id)
        log.debug(recs)
        if(recs.isNotEmpty()) {
            val recMap = HashMap<String,AttendRecEntity>()
            val beginTime = recs.first().beginTime

            // 开始考勤是将所有记录标记为旷课
            val tag: Byte  = if(refreshTime.before(beginTime)) 3 else 2
            recs.forEach {
                it.phoneIn = false
                it.BTException = true
                it.refreshTime = refreshTime
                it.attendTag = tag
                recMap[it.stuID!!] = it
            }

            succList.forEach {
                val stuId = it["stuId"]
                val rec = recMap[stuId]
                rec?.let {self ->
                    self.MAC = it["BMac"] as String?
                    self.refreshTime = refreshTime
                    self.attendTag = when {
                        refreshTime.before(beginTime) -> 1
                        else -> 2
                    }
                    self.leaveEarly = false
                    self.phoneIn = true
                    log.info(self)
                    recMap["stuId"] = self
                }
            }

            log.debug("finished sign in")
            recordRepo.saveAll(recMap.values)
            msg.setCode(200).setMsg("sign in success")
        } else {
            msg.setCode(400).setMsg("can't find any record that this device match, or no record require sign")
        }




        val data = SignResult(succList,failList)
        val md5 = Md5.md5HexObj(data,sign)
        return msg.setData(SignResponse(md5?:"",data))
    }

    fun all(): List<StudentEntity> {
        val students = studentRepo.findAll().toList()
        log.info("find all students")
        todo.runAt("2020-02-20 21:30:00")
        return students
    }

    fun lessons(id: String): Message {
        val lessons = lessonRepo.findAllByStuID(id)
        val lessonMap = HashMap<String,String>()
        lessons.forEach { lessonMap[it.lessonID!!] = it.lessonName!! }
        val recs = recordRepo.findAttendRecEntitiesByStuID(id,false)
        val todo = ArrayList<Record>()
        recs.forEach {
            val roomId = it.roomID!!
            val room = cache.roomMap[roomId]!!
            val place = "${room.building}:${room.roomName}:${room.siteCount}"
            val temp = Record(place,it.beginTime!!,it.endTime!!,lessonMap[it.lessonID]!!)
            todo.add(temp)
        }
        val result = mapOf(
                "lessons" to lessons,
                "todo" to todo
        )
        return Message(200,"all the lessons of this student",result)
    }

    data class Record(
            val place: String,
            val beginTime: Timestamp,
            val endTime: Timestamp,
            val lessonName: String
    )

}