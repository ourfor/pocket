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
        val passwordHash = when(type) {
            "student" -> {
                val student =studentRepo.findByIdOrNull(username)
                nickname = student?.stuName
                mac = student?.MAC
                student?.passwdHash
            }
            "teacher" -> {
                val teacher = teacherRepo.findByIdOrNull(username.toShort())
                nickname = teacher?.teachName
                teacher?.passwdHash
            }
            else -> {
                val userInfo = userInfoRepo.findByIdOrNull(username.toShort())
                nickname = userInfo?.userName
                userInfo?.passwdHash
            }
        }
        if(passwordHash?.replace("-","")?.toLowerCase() == Md5.md5Hex(password,username)) return mapOf(
                "user" to username,
                "nickname" to nickname,
                "check" to true,
                "role" to data.type,
                "mac" to mac
        ) else return mapOf(
                "user" to username,
                "role" to "unknown",
                "check" to false
        )
    }

}