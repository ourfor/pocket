package service

import database.*
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

    fun svrKey(id: Short): String? = cache.svrKeyMap[id]

    /**
     * @author ourfor
     * @param addr Each Bluetooth BR/EDR device has a unique 48-bit MAC address known as the BD_ADDR
     * @param studId Student Identifiers
     */
    fun add(@RequestParam addr: String, @RequestParam studId: String?): Map<String,Any?> {

        // find student by bluetooth mac address 通过蓝牙MAC地址查找学生, 如果为空, 再通过学号查找
        val student = studentRepo.findByMAC(addr)?:studentRepo.findByStuID(studId?:"")

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
                // first use system 第一次使用系统, 绑定蓝牙
                student.MAC = addr.replace("-","").replace(":","")
                log.debug("bluetooth address: $addr")
                // change password by using web client, set default here, 设置默认的密码, 为蓝牙地址
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
        val distances = HashMap<String,Float>()
        val failList = ArrayList<SignInfo>()
        students.forEach {
            (MAC,studId,distance) ->
            val result = add(MAC,studId)
            if(result["stuName"]!="undefined") {
                distances[studId!!] = distance.toFloat()
                succList.add(result)
            }
            else failList.add(SignInfo(MAC,studId,distance))
        }


        val now = System.currentTimeMillis()
        val refreshTime = Timestamp(now)
        log.info(refreshTime)
        // get record between this time
        // find those record that this device with this id can sign in
        val recs = recordRepo.findRecLimitTime(refreshTime,id)
        log.debug(recs)

        if(recs.isNotEmpty()) {
            val recMap = HashMap<String,AttendRecEntity>()
            val beginTime = recs.first().beginTime!!

            // 开始考勤是将所有记录标记为正常
            // tag: 1 正常, 2 迟到, 3 旷课
            val tag: Byte  = when(val diff = refreshTime.time - beginTime.time) {
                in -300_000..300_000 -> 1 // 允许迟到或者提前5分钟
                else -> 2
            }


            recs.forEach {
                recMap[it.stuID!!] = it
            }

            succList.forEach {
                val stuId = it["stuId"]
                val rec = recMap[stuId]
                rec?.let {self ->
                    self.MAC = it["BMac"] as String?
                    self.refreshTime = refreshTime
                    // 原本正常的状态不需要修改
                    if(self.attendTag!=1.toByte()) self.attendTag = tag
                    // 蓝牙距离小于2米, 标记为手机入袋
                    if(distances[self.stuID]!! <=2) self.phoneIn = true
                    log.info(self)
                    recMap["stuId"] = self
                }
            }

            // 修改没有签到的学生状态, 通过refreshTime判断学生是否签到
            recMap.forEach { (key,value) ->
                if(value.refreshTime != refreshTime) {
                    value.attendTag = tag
                }
                recMap[key] = value
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