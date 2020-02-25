package service

import database.StudentRepo
import database.TeacherRepo
import database.UserInfoRepo
import message.AuthData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import tools.Md5

@Service
class AuthService: CommonService() {

    @Autowired
    lateinit var teacherRepo: TeacherRepo
    @Autowired
    lateinit var studentRepo: StudentRepo
    @Autowired
    lateinit var userInfoRepo: UserInfoRepo

    fun check(data: AuthData,md5: String): Boolean {
        return Md5.verify(data,"login",md5)
    }

    fun login(data: AuthData): Map<String,Any?> {
        val (username,password,type) = data
        var nickname: String? = ""
        var mac: String? = ""
        var sex: Boolean? = null
        val passwordHash = when(type) {
            "student" -> {
                val student =studentRepo.findByIdOrNull(username)
                nickname = student?.stuName
                mac = student?.MAC
                sex = student?.sex
                student?.passwdHash
            }
            "teacher" -> {
                val teacher = teacherRepo.findByIdOrNull(username.toShort())
                nickname = teacher?.teachName
                sex = teacher?.sex
                teacher?.passwdHash
            }
            else -> {
                val userInfo = userInfoRepo.findByIdOrNull(username.toShort())
                nickname = userInfo?.userName
                userInfo?.passwdHash
            }
        }
        return if(passwordHash?.replace("-","")?.toLowerCase() == Md5.md5Hex(password,username)) mapOf(
                "user" to username,
                "nickname" to nickname,
                "check" to true,
                "role" to data.type,
                "mac" to mac,
                "sex" to sex
        ) else mapOf(
                "user" to username,
                "role" to "unknown",
                "check" to false
        )
    }

}