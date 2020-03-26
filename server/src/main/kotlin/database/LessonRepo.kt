package database

import org.springframework.data.jpa.repository.Query
import org.springframework.data.jpa.repository.query.Procedure
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface LessonRepo : CrudRepository<LessonEntity,String> {
    fun findAllByTeachID(id: Short): List<LessonEntity>
    @Query(value="exec sp_find_select_lesson ?1",nativeQuery = true)
    fun findAllByStuID(id: String): List<LessonEntity>
    fun findByLessonIDAndTerm(id: String, term: String): LessonEntity?
    @Procedure("sp_delete_lesson")
    fun deleteLesson(lessonId: String, term: String)
}