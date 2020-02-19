package service

import database.StudentEntity
import database.StudentRepo
import message.SignInfo
import message.SignResponse
import message.SignResult
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestParam
import store.Cache
import tools.Md5

@Suppress("UNCHECKED_CAST")
@Service
class StudentService : CommonService() {

    @Autowired
    lateinit var studentRepo: StudentRepo

    @Autowired
    lateinit var cache: Cache

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
                    "siteNo" to "undefined"
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
                    "stuName" to student.stuName,
                    "classId" to student.classID,
                    "siteNo" to student.siteNo
            )
        }

        return result
    }

    fun addAll(students: List<SignInfo>,sign: String): SignResponse {
        val succList = ArrayList<Map<String,Any?>>()
        val failList = ArrayList<SignInfo>()
        students.forEach {
            (MAC,studId,distance) ->
            val result = add(MAC,studId)
            if(result["stuName"]!="undefined") succList.add(result)
            else failList.add(SignInfo(MAC,studId,distance))
        }
        val data = SignResult(succList,failList)
        val md5 = Md5.md5HexObj(data,sign)
        return SignResponse(md5?:"",data)
    }

    fun all(): List<StudentEntity> {
        val students = studentRepo.findAll().toList()
        log.info("find all students")
        return students
    }

}