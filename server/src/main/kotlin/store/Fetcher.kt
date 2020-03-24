@file:Suppress("UNCHECKED_CAST")

package store

import database.*
import graphql.schema.DataFetcher
import graphql.schema.StaticDataFetcher
import graphql.schema.idl.RuntimeWiring
import graphql.schema.idl.RuntimeWiring.newRuntimeWiring
import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import tools.Md5
import java.util.*

const val VERSION = "2020-03-14"

@Repository
class Fetcher {

    @Autowired
    lateinit var lessonRepo: LessonRepo
    @Autowired
    lateinit var roomRepo: RoomRepo
    @Autowired
    lateinit var agentServerRepo: AgentServerRepo
    @Autowired
    lateinit var studentRepo: StudentRepo
    @Autowired
    lateinit var teacherRepo: TeacherRepo
    @Autowired
    lateinit var userRepo: UserInfoRepo
    @Autowired
    lateinit var log: Logger
    @Autowired
    lateinit var cache: Cache




    fun createStudent(): DataFetcher<*> = DataFetcher { env ->

        val map = env.arguments["student"] as Map<String,*>
        val stuName = map["stuName"] as String?
        val stuID = map["stuID"] as String?
        val classId = map["classID"] as Short?
        val sex = map["sex"] as Boolean?
        val password = map["password"] as String?
        val siteNo = map["siteNo"] as Byte?
        val mac = map["mac"] as String?
        val passwordHash = Md5.md5Passwd(password?:"88888888",stuID)
        val student = StudentEntity(stuID,stuName,classId,sex,passwordHash,mac,siteNo)
        studentRepo.save(student)
        student
    }

    fun updateStudent(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["student"] as Map<String,*>
        val id = map["stuID"] as String?
        id?.let {
            val student = studentRepo.findByStuID(id)

            student?.let { self ->
                val stuName = map["stuName"] as String?
                stuName?.let { self.stuName = it }
                val classId = map["classID"] as Short?
                classId?.let { self.classID = it }
                val sex = map["sex"] as Boolean?
                sex?.let { self.sex = it }
                val password = map["password"] as String?
                password?.let {self.passwdHash = Md5.md5Passwd(it,self.stuID) }
                val siteNo = map["siteNo"] as Byte?
                siteNo?.let { self.siteNo = it }
                val mac = map["mac"] as String?
                mac?.let { self.MAC = it }

                studentRepo.save(self)
                self
            }
        }
    }

    fun deleteStudent(): DataFetcher<*> = DataFetcher { env ->
        val id = env.arguments["id"] as String?
        id?.let {
            val student = studentRepo.findByStuID(id)
            studentRepo.deleteById(id)
            student
        }
    }

    fun createTeacher(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["teacher"] as Map<String,*>
        val teachName = map["teachName"] as String?
        val teachID = map["teachID"] as Short?
        val sex = map["sex"] as Boolean?
        val password = map["password"] as String?
        val passwordHash = Md5.md5Passwd(password?:"88888888","$teachID")
        val teacher = TeacherEntity(teachID,teachName,passwordHash,sex)
        teacherRepo.save(teacher)
        teacher
    }

    fun updateTeacher(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["teacher"] as Map<String,*>
        val id = map["teachID"] as Short?
        id?.let {
            val teacher = teacherRepo.findByTeachID(id)
            teacher?.let { self ->
                val teachName = map["teachName"] as String?
                teachName?.let { self.teachName = it }
                val sex = map["sex"] as Boolean?
                sex?.let { self.sex = it }
                val password = map["password"] as String?
                password?.let { self.passwdHash = Md5.md5Passwd(password,"${self.teachID}") }

                teacherRepo.save(self)
                self
            }
        }
    }

    fun deleteTeacher(): DataFetcher<*> = DataFetcher {  env ->
        val id = env.arguments["id"] as Short?
        id?.let {
            val teacher = teacherRepo.findById(id)
            teacherRepo.deleteById(id)
            teacher
        }
    }

    fun createRoom(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["room"] as Map<String,*>
        val id = map["roomID"] as Short?
        id?.let {
            val room = when(val exist = roomRepo.findByRoomID(it)) {
                null -> {
                    val roomName = map["roomName"] as String?
                    val siteCount = map["siteCount"] as Short?
                    val building = map["building"] as String?
                    RoomEntity(id,roomName,siteCount,building)
                }
                else -> exist
            }
            roomRepo.save(room)
            
            room
        }
    }

    fun updateRoom(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["room"] as Map<String,*>
        val id = map["roomID"] as Short?
        id?.let { self ->
            val room = when(val exist = roomRepo.findByRoomID(self)) {
                null -> null
                else -> {
                    val roomName = map["roomName"] as String?
                    roomName?.let { exist.roomName = it }
                    val siteCount = map["siteCount"] as Short?
                    siteCount?.let { exist.siteCount = it }
                    val building = map["building"] as String?
                    building?.let { exist.building = it }
                    roomRepo.save(exist)
                    exist
                }
            }
            room
        }
    }

    fun deleteRoom(): DataFetcher<*> = DataFetcher { env ->
        val id = env.arguments["id"] as Short?
        id?.let {
            val room = roomRepo.findByRoomID(id)
            room?.let {
                roomRepo.delete(it)
                it
            }
        }
    }

    fun createDevice(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["device"] as Map<String,*>
        val code = map["svrCode"] as String?
        code?.let {
            val version = map["version"] as String??:"2020"
            val roomID = map["roomID"] as Short??:1
            val exception = map["exception"] as Boolean??:false
            val online = map["online"] as Boolean??:false

            log.info("register new device with $code :D")
            val key = UUID.randomUUID().toString()

            var id = if(cache.agentSvrList.isEmpty()) 0
            else cache.agentSvrList.last().svrID!!

            val svr = AgentServerEntity(++id,code,version,key,roomID,exception,online)
            try {
                agentServerRepo.save(svr)
                svr
            } catch (e: Exception) {
                log.error("failed to register new device with $code")
                null
            }
        }
    }

    fun updateDevice(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["device"] as Map<String,*>
        val id = map["svrID"] as Short?
        id?.let {
            val device = agentServerRepo.findBySvrID(id)
            device?.let { self ->
                val code = map["svrCode"] as String?
                code?.let { self.svrCode = it }
                val version = map["version"] as String?
                version?.let { self.version = it }
                val roomId = map["roomID"] as Short?
                roomId?.let { self.roomID = it }
                val exception = map["exception"] as Boolean?
                exception?.let { self.exception = it }
                val online = map["online"] as Boolean?
                online?.let { self.online = it }
                try {
                    agentServerRepo.save(self)
                    roomId?.let {
                        try {
                            agentServerRepo.updateRoomID(id, it)
                        } catch (e: Exception) {
                            log.error("failed to update roomID($it)")
                            log.error(e.toString())
                            null
                        }
                    }
                    self
                } catch (e: Exception) {
                    log.error("failed to update agent device $id")
                    null
                }
            }
        }
    }

    fun deleteDevice(): DataFetcher<*> = DataFetcher {  env ->
        val id = env.arguments["id"] as Short?
        id?.let {
            val device = agentServerRepo.findBySvrID(id)
            agentServerRepo.deleteById(id)
            device
        }
    }

    fun createUser(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["user"] as Map<String,*>
        val userId = map["userID"] as Short?
        val userName = map["userName"] as String?
        val password = map["password"] as String?
        val user = UserInfoEntity(userId,userName,Md5.md5Passwd(password?:"","$userId"))
        userRepo.save(user)
        user
    }

    fun updateUser(): DataFetcher<*> = DataFetcher { env ->
        val map = env.arguments["user"] as Map<String,*>
        val userId = map["userID"] as Short?
        userId?.let { id ->
            val user = userRepo.findByUserID(id)
            user?.let { self ->
                val userName = map["userName"] as String?
                userName?.let { user.userName = it }
                val password = map["password"] as String?
                password?.let { user.passwdHash = Md5.md5Passwd(it,"$id") }
                userRepo.save(self)
                self
            }
        }
    }

    fun deleteUser(): DataFetcher<*> = DataFetcher { env ->
        val id = env.arguments["id"] as Short?
        id?.let {
            val user = userRepo.findByUserID(id)
            user?.let {
                userRepo.deleteById(id)
                it
            }
        }
    }

    val student: DataFetcher<*>
        get() = DataFetcher { env ->
            val id = env.arguments["id"] as String?
            if (id != null)
                studentRepo.findById(id)
            else {
                val name = env.arguments["name"] as String?
                var result: Any? = null
                name?.let {
                    result = Students(name, studentRepo.findByStuName(name))
                }
                result
            }
        }

    val teacher: DataFetcher<*>
        get() = DataFetcher { env ->
            val id = env.arguments["id"] as Short?
            if (id != null)
                teacherRepo.findById(id)
            else {
                val name = env.arguments["name"] as String?
                var result: Any? = null
                name?.let {
                    result = Teachers(name, teacherRepo.findByTeachName(name))
                }
                result
            }
        }

    val students: DataFetcher<*>
        get() = DataFetcher {
            studentRepo.findAll()
        }

    val rooms: DataFetcher<*>
        get() = DataFetcher {
            roomRepo.findAll()
        }

    val devices: DataFetcher<*>
        get() = DataFetcher {
            agentServerRepo.findAll()
        }

    val lessons: DataFetcher<*>
        get() = DataFetcher {
            lessonRepo.findAll()
        }

    val teachers: DataFetcher<*>
        get() = DataFetcher {
            teacherRepo.findAll()
        }

    val users: DataFetcher<*>
        get() = DataFetcher {
            userRepo.findAll()
        }

    fun buildWiring(): RuntimeWiring = newRuntimeWiring()
            .type("Query"){ data ->
                data
                    .dataFetcher("timestamp",StaticDataFetcher(System.currentTimeMillis()))
                    .dataFetcher("version",StaticDataFetcher(VERSION))
                    .dataFetcher("student",student)
                    .dataFetcher("teacher",teacher)
                    .dataFetcher("students",students)
                    .dataFetcher("teachers",teachers)
                    .dataFetcher("rooms",rooms)
                    .dataFetcher("devices",devices)
                    .dataFetcher("lessons",lessons)
                    .dataFetcher("users",users)
            }
            .type("Mutation") { data ->
                data.dataFetcher("createStudent",createStudent())
                    .dataFetcher("updateStudent",updateStudent())
                    .dataFetcher("deleteStudent",deleteStudent())
                    .dataFetcher("createTeacher",createTeacher())
                    .dataFetcher("updateTeacher",updateTeacher())
                    .dataFetcher("deleteTeacher",deleteTeacher())
                    .dataFetcher("createDevice",createDevice())
                    .dataFetcher("updateDevice",updateDevice())
                    .dataFetcher("deleteDevice",deleteDevice())
                    .dataFetcher("createRoom",createRoom())
                    .dataFetcher("updateRoom",updateRoom())
                    .dataFetcher("deleteRoom",deleteRoom())
                    .dataFetcher("createUser",createUser())
                    .dataFetcher("updateUser",updateUser())
                    .dataFetcher("deleteUser",deleteUser())
            }
            .type("StudentInfo") {
                it
                    .typeResolver(studentResolver)
                    .defaultDataFetcher(student)
            }
            .type("TeacherInfo") {
                it
                    .typeResolver(teacherResolver)
                    .defaultDataFetcher(teacher)
            }
            .build()
}


