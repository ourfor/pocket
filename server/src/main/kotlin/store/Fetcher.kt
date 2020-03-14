package store

import database.StudentEntity
import database.StudentRepo
import database.TeacherEntity
import database.TeacherRepo
import graphql.schema.DataFetcher
import graphql.schema.StaticDataFetcher
import graphql.schema.idl.RuntimeWiring
import graphql.schema.idl.RuntimeWiring.newRuntimeWiring
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class Fetcher {

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

    val teachers: DataFetcher<*>
    get() = DataFetcher {
        teacherRepo.findAll()
    }

    fun buildWiring(): RuntimeWiring = newRuntimeWiring()
            .type("Query"){
                data ->
                data
                    .dataFetcher("name",StaticDataFetcher("100"))
                    .dataFetcher("age",StaticDataFetcher(100))
                    .dataFetcher("student",student)
                    .dataFetcher("teacher",teacher)
                    .dataFetcher("students",students)
                    .dataFetcher("teachers",teachers)
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


