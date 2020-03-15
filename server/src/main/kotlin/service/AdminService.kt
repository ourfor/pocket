package service

import database.UserInfoEntity
import database.UserInfoRepo
import graphql.GraphQL
import message.AdminAuthData
import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import tools.Md5
import tools.format

@Service
class AdminService : CommonService() {

    @Autowired
    lateinit var userInfoRepo: UserInfoRepo
    @Autowired
    lateinit var graphql: GraphQL

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

    fun check(data: AdminAuthData): Message {
        val user = userInfoRepo.findByIdOrNull(data.username)
        return when {
            user==null ->
                Message(StatusCode.NOT_FOUND.value(),"this user not exist",null)
            Md5.verify(data.passwd+data.username,user.passwdHash!!.replace("-","").toLowerCase()) ->
                Message(200,"welcome back ${user.userName}",mapOf(
                    "username" to user.userName,
                    "id" to user.userID
                ))
            else ->
                Message(StatusCode.UNAUTHORIZED.value(),"username or password wrong",null)
        }
    }

    fun all(query: String): Message {
        return try {
            val data = graphql.execute(query).getData<Any?>()
            Message(200,"success",data)
        } catch (e: Exception) {
            log.error("failed to execute graphql query or mutation")
            Message(400,"error",null)
        }
    }

}