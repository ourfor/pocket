package service

import com.fasterxml.jackson.annotation.JsonProperty
import database.*
import message.Message
import message.RecordRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import store.Cache
import java.sql.Timestamp
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

@Service
class RecordService : CommonService() {

    @Autowired
    lateinit var studentRepo: StudentRepo
    @Autowired
    lateinit var selectLessonRepo: SelectLessonRepo
    @Autowired
    lateinit var recordRepo: AttendRecRepo
    @Autowired
    lateinit var serverRepo: AgentServerRepo
    @Autowired
    lateinit var lessonRepo: LessonRepo
    @Autowired
    lateinit var roomRepo: RoomRepo
    @Autowired
    lateinit var cache: Cache

    /**
     * @param req create some records with startTime, endTime, lessonId, roomId and term
     */
    fun create(req: RecordRequest): Boolean {
        log.info(req)
        val lesson = req.lesson
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm")

        val now = Timestamp(Date().time)
        val startTime = Timestamp(sdf.parse(req.time[0]).time)
        val endTime = Timestamp(sdf.parse(req.time[1]).time)

        val roomID= req.room
        val svrID = try {
            serverRepo.findTopByRoomID(roomID)!!.svrID
        } catch (e: Exception) {
            log.info("no agent device register for this room")
            return false
        }

        val selectLessons = selectLessonRepo.findAllByLessonIDAndTerm(lesson.id,lesson.term)
        val recs = ArrayList<AttendRecEntity>()

        selectLessons.forEach {
            select ->
            select.stuID?.let{id ->
                studentRepo.findByIdOrNull(id)?.let {
                    val rec = AttendRecEntity(
                            now,id,svrID,"2-10",roomID,lesson.id,lesson.term,it.MAC,
                            startTime,endTime,1,false,
                            now,false,false,false

                    )
                    recs.add(rec)
                }
            }
        }

        return try {
            recordRepo.saveAll(recs)
            log.info("success to create record for students")
            true
        } catch (e: Exception) {
            log.error("fail to create record for students, with exception: $e")
            false
        }
    }

    /**
     * @param teachId teacher's id
     * @param beginTime get records by begin time
     */
    fun view(teachId: Short,beginTime: String): List<*> {
        val lessons = lessonRepo.findAllByTeachID(teachId)
        val result = ArrayList<RecordWithLesson>()
        lessons.forEach { lesson ->
            val records = recordRepo.findAllByLessonIDAndTerm(lesson.lessonID!!,lesson.term!!)
            records.let { result.add(RecordWithLesson(lesson,it)) }
        }
        return result
    }

    /**
     * @param teachId teacher's id
     * @description 获取考勤记录的时间, 用课程来分类
     */
    fun view(teachId: Short): List<*> {
        val lessons = lessonRepo.findAllByTeachID(teachId)
        val result = ArrayList<RecordWithTime>()
        lessons.forEach {
            lesson ->
            val times = recordRepo.findDistinctBeginTimeByLessonIDAndTerm(lesson.lessonID!!,lesson.term!!)
            times.let { result.add(RecordWithTime(lesson,times)) }
        }
        return result
    }

    /**
     * @param lessonId 课程Id
     * @param term 开课学期
     * @param beginTime 考勤记录开始时间
     * @description 通过课程id和开课学期以及考勤记录开始时间获得考勤记录
     */
    fun view(lessonId: String, term: String, beginTime: Timestamp): Any {
        val records = recordRepo.findAllByLessonIDAndTermAndBeginTime(lessonId,term,beginTime)
        val students = cache.students(lessonId,term)
        return RecordWithStudent(records,students)
    }

    /**
     * @param teachId teacher's id
     * @description 获取进行中的考勤记录
     */
    fun todo(teachId: Short): List<*> {
        val lessons = lessonRepo.findAllByTeachID(teachId)
        val result = ArrayList<Todo>()
        lessons.forEach {
            lesson ->
            val times = recordRepo.findDistinctBeginTimeByLessonIDAndTerm(lesson.lessonID!!,lesson.term!!)
            times.let {
                times.forEach {
                    val rec = recordRepo.findDistinctTopByBeginTimeAndLessonIDAndTerm(it,lesson.lessonID!!,lesson.term!!)
                    val room = roomRepo.findByIdOrNull(rec.roomID!!)
                    result.add(Todo(lesson,rec.beginTime!!,rec.endTime!!,room))
                }
            }
        }
        return result
    }

    /**
     * @param lessonId 课程号
     * @param term 学期
     * @param room 教室号
     * @param beginTime 考勤开始时间
     * @param endTime 考勤结束时间
     * @description 删除没有实际执行的考勤记录
     */
    fun delete(lessonId: String, term: String, room: Short, beginTime: Timestamp, endTime: Timestamp): Message {
        log.info("start to delete some records")
        val result = recordRepo.deleteAllByLessonIDAndTermAndRoomIDAndBeginTimeAndEndTime(lessonId,term,room,beginTime,endTime)
        log.info("success to delete $result records")
        return Message(200,"$result 条记录删除成功",null)
    }

    data class RecordWithLesson(
            val lesson: LessonEntity,
            val records: List<AttendRecEntity>
    )

    data class RecordWithStudent(
            val records: List<*>,
            val students: Map<*,*>
    )

    data class RecordWithTime(
            val lesson: LessonEntity,
            @get:JsonProperty("time_range")
            val timeRange: List<Timestamp>
    )

    data class Todo(
            val lesson: LessonEntity,
            val beginTime: Timestamp,
            val endTime: Timestamp,
            val room: RoomEntity?
    )
}