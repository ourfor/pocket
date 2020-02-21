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
    // find record by limit beginTime > now > endTime and match SvrID ( agent server id)
    @Query(value="select * from AttendRec where SvrID = ?2 and BeginTime < ?1 and EndTime > ?1",nativeQuery = true)
    fun findRecLimitTime(time: Timestamp, id: Short): List<AttendRecEntity>
    fun findDistinctTopByBeginTimeAndLessonIDAndTerm(beginTime: Timestamp, lessonID: String, term: String): AttendRecEntity
    // find all the record, which is not over
    @Query(value="exec sp_find_not_over_record",nativeQuery = true)
    fun findAllByIsOverFalse(): List<AttendRecEntity>
}