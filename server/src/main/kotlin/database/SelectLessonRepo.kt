package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface SelectLessonRepo : CrudRepository<SelectLessonEntity,String> {
    fun findAllByLessonIDAndTerm(lessonID: String,term: String): List<SelectLessonEntity>
}