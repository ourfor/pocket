package database

import org.springframework.data.jpa.repository.query.Procedure
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface SelectLessonRepo : CrudRepository<SelectLessonEntity,String> {
    fun findAllByLessonIDAndTerm(lessonID: String,term: String): List<SelectLessonEntity>

    @Procedure(procedureName = "sp_add_select_lesson")
    fun addStudents(lessonID: String,term: String,classId: Short)
}

