package database

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface StudentRepo : CrudRepository<StudentEntity,String> {
    fun findByStuID(stuId: String): StudentEntity?
    fun findByMAC(MAC: String): StudentEntity?
    @Query(value="exec sp_find_student_with_lesson ?1,?2",nativeQuery = true)
    fun findNameAndIDByLesson(lessonId: String,term: String): List<StudentInfo>

    @Query(value="exec sp_find_student_classes",nativeQuery = true)
    fun getAllClasses(): List<Short>

    fun findAllByClassID(classID: Short): List<StudentEntity>
    fun findByStuName(stuName: String): List<StudentEntity>
}

interface StudentInfo {
    val id: String
    val name: String
}
