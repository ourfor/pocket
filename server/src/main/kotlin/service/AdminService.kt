package service

import database.UserInfoRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import tools.Md5

@Service
class AdminService : CommonService() {

    @Autowired
    lateinit var userInfoRepo: UserInfoRepo


    fun check(username: String, password : String): Boolean {
        return when(val user = userInfoRepo.findByUserName(username)) {
            null -> false
            else -> user.passwdHash == Md5.md5Hex(password)
        }
    }

}