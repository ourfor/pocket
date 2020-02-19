package database

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.sql.Timestamp
import javax.transaction.Transactional

@Repository
@Transactional
interface AttendRecRepo : CrudRepository<AttendRecEntity,String> {
    fun findAllByLessonIDAndTermAndBeginTime(lessonID: String,term: String,beginTime: Timestamp): List<AttendRecEntity>
    fun findAllByLessonIDAndTerm(lessonID: String, term: String): List<AttendRecEntity>
    @Query(value="select distinct BeginTime from AttendRec where LessonID=?1 and Term=?2",nativeQuery = true)
    fun findDistinctBeginTimeByLessonIDAndTerm(lessonID: String,term: String): List<Timestamp>
    @Query(value="select * from AttendRec where BeginTime < ?1 and EndTime > ?1",nativeQuery = true)
    fun findRecLimitTime(time: Timestamp): List<AttendRecEntity>
}