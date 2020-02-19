package service

import database.*
import message.RecordRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
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

    fun create(req: RecordRequest): Boolean {
        log.info(req)
        val lesson = req.lesson
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm")

        val now = Timestamp(Date().time)
        val startTime = Timestamp(sdf.parse(req.time[0]).time)
        val endTime = Timestamp(sdf.parse(req.time[1]).time)

        val roomID= req.room
        val svrID = serverRepo.findTopByRoomID(roomID)!!.svrID
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
}