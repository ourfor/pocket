package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface TeacherRepo : CrudRepository<TeacherEntity,Short> {
    fun findByTeachName(name: String): List<TeacherEntity>
}
