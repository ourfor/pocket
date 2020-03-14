package store

import database.StudentEntity
import database.TeacherEntity
import graphql.schema.TypeResolver

val teacherResolver = TypeResolver { env ->
    val type = when(env.getObject<Any>()) {
        is TeacherEntity -> "Teacher"
        is Teachers -> "Teachers"
        else -> null
    }

    type?.let { env.schema.getObjectType(type) }
}

val studentResolver = TypeResolver { env ->
    val type = when(env.getObject<Any>()) {
        is StudentEntity -> "Student"
        is Students -> "Students"
        else -> null
    }
    type?.let { env.schema.getObjectType(type) }
}

data class Teachers (
        val name: String,
        val teachers: List<TeacherEntity>
)

data class Students (
        val name: String,
        val students: List<StudentEntity>
)