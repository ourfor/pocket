@file:Suppress("UNCHECKED_CAST")

package store

import database.*
import graphql.schema.DataFetcher
import graphql.schema.StaticDataFetcher
import graphql.schema.idl.RuntimeWiring
import graphql.schema.idl.RuntimeWiring.newRuntimeWiring
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import tools.Md5

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


    val student: DataFetcher<*>
    get() = DataFetcher {
        env ->
        val id = env.arguments["id"] as String?
        if(id!=null)
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

    fun createStudent(): DataFetcher<*> = DataFetcher { env ->

        val map = env.arguments["student"] as Map<String,*>
        val stuName = map["stuName"] as String?
        val stuID = map["stuID"] as String?
        val classId = map["classId"] as Short?
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
                val classId = map["classId"] as Short?
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


    val teacher: DataFetcher<*>
    get() = DataFetcher {
        env ->
        val id = env.arguments["id"] as Short?
        if(id!=null)
            teacherRepo.findById(id)
        else {
            val name = env.arguments["name"] as String?
            var result: Any? = null
            name?.let {
                result = Teachers(name,teacherRepo.findByTeachName(name))
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
            }
            .type("Mutation") { data ->
                data.dataFetcher("createStudent",createStudent())
                    .dataFetcher("updateStudent",updateStudent())
                    .dataFetcher("deleteStudent",deleteStudent())
                    .dataFetcher("createTeacher",createTeacher())
                    .dataFetcher("updateTeacher",updateTeacher())
                    .dataFetcher("deleteTeacher",deleteTeacher())
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


