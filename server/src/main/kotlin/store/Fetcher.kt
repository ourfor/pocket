package store

import database.StudentRepo
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
        val id = env.arguments["id"] as String
        studentRepo.findById(id)
    }

    val teacher: DataFetcher<*>
    get() = DataFetcher {
        env ->
        val id = env.arguments["id"] as Short
        teacherRepo.findById(id)
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
            .build()
}


