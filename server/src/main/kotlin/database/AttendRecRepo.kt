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

    // find all begin time of records by lesson
    @Query(value="exec sp_find_begin_time_by_lesson ?1, ?2",nativeQuery = true)
    fun findDistinctBeginTimeByLessonIDAndTerm(lessonID: String,term: String): List<Timestamp>

    @Query(value="exec sp_find_today_record_begin ?1,?2",nativeQuery = true)
    fun findBeginTimeToday(lessonID: String, term: String): List<Timestamp>

    // find records by limit beginTime > now > endTime and match SvrID ( agent server id)
    @Query(value="exec sp_find_records_some_time ?1, ?2",nativeQuery = true)
    fun findRecLimitTime(svrId: Short, time: Timestamp): List<AttendRecEntity>

    // find records by limit time = now and match roomID ( agent server register room id)
    @Query(value="exec sp_find_records_now_in_room ?1",nativeQuery = true)
    fun findRecNowAndPlace(roomId: Short): List<AttendRecEntity>

    // find records by limit time between beginTime and endTime and match roomID
    @Query(value="exec sp_find_records_some_time_in_room ?1, ?2",nativeQuery = true)
    fun findRecLimitTimeAndPlace(roomId: Short, time: Timestamp): List<AttendRecEntity>

    fun findDistinctTopByBeginTimeAndLessonIDAndTerm(beginTime: Timestamp, lessonID: String, term: String): AttendRecEntity
    // find all the record, which is not over
    @Query(value="exec sp_find_not_over_record",nativeQuery = true)
    fun findAllByIsOverFalse(): List<AttendRecEntity>

    @Query(value="exec sp_find_record_student ?1,?2",nativeQuery = true)
    fun findAttendRecEntitiesByStuID(stuID: String,isOver: Boolean): List<AttendRecEntity>

    //  find records by student id
    @Query(value="exec sp_find_record_by_student_id ?1",nativeQuery = true)
    fun findAttendRecEntitiesByStuID(stuID: String): List<AttendRecEntity>

    fun deleteAllByLessonIDAndTermAndRoomIDAndBeginTimeAndEndTime(lessonId: String,term: String,roomId: Short,beginTime: Timestamp,endTimestamp: Timestamp): Int?
}