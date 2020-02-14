package service

import database.StudentEntity
import database.StudentRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestParam
import tools.Md5

@Suppress("UNCHECKED_CAST")
@Service
class StudentService : CommonService() {

    @Autowired
    lateinit var studentRepo: StudentRepo

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
                student?.let { studentRepo.findByMAC(addr) }
            }
        }

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
            if(student.MAC=="unknown") {
                // first use system
                student.MAC = addr
                // change password by using web client, set default here
                student.passwdHash = Md5.md5Hex(addr)
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

    fun all(): List<StudentEntity> {
        return studentRepo.findAll() as List<StudentEntity>
    }

}