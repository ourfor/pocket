package service

import database.UserInfoEntity
import database.UserInfoRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import tools.Md5
import tools.format

@Service
class AdminService : CommonService() {

    @Autowired
    lateinit var userInfoRepo: UserInfoRepo


    fun check(username: String, password : String, md5: String): Boolean {
        if(Md5.verify(password+username,md5)) return false
        return when(val user = userInfoRepo.findByUserName(username)) {
            null -> false
            else -> user.passwdHash == md5
        }
    }

    fun register(username: String, password: String,md5: String): Boolean {
        val data = password.trim() + username.trim()
        if(!Md5.verify(data,md5.trim())) return false
        log.info("i am here")
        return when(val user = userInfoRepo.findByUserName(username)) {
            null -> {
                log.info("register new user $username")
                var id = userInfoRepo.findFirstByOrderByUserIDDesc()?.userID?:0
                return try {
                    userInfoRepo.save(UserInfoEntity(++id,username,format(md5).trim()))
                    true
                } catch (e: Exception) {
                    log.error("$username register failed")
                    log.error(e)
                    false
                }
            }
            else -> {
                log.info("user $username have already register")
                user.passwdHash == format(md5)
            }
        }
    }

}