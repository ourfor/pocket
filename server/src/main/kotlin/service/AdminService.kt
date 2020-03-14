package service

import database.UserInfoEntity
import database.UserInfoRepo
import graphql.GraphQL
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.SchemaParser
import message.AdminAuthData
import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ResourceLoader
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import store.Fetcher
import tools.Md5
import tools.format
import java.io.File
import javax.annotation.PostConstruct

@Service
class AdminService : CommonService() {

    @Autowired
    lateinit var userInfoRepo: UserInfoRepo
    @Autowired lateinit var fetcher: Fetcher
    @Autowired lateinit var resource: ResourceLoader

    private lateinit var graphql: GraphQL


    @PostConstruct
    fun init() {
        val input = resource.getResource("classpath:/service/query.gql").inputStream
        val type = SchemaParser().parse(input)
        val wiring = fetcher.buildWiring()
        val schema = SchemaGenerator().makeExecutableSchema(type,wiring)
        this.graphql = GraphQL.newGraphQL(schema).build()
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
        val data = graphql.execute(query).getData<Any?>()
        return Message(200,"query data",data)
    }

}