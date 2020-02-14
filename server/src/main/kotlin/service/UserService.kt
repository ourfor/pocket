package service

import database.UserInfoRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService : CommonService() {

    @Autowired
    lateinit var userRepo: UserInfoRepo

    fun signUp(): Boolean {
        return true
    }

}