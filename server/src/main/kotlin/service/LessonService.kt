package service

import database.*
import message.LessonRequest
import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache

@Service
class LessonService : CommonService() {
    @Autowired
    lateinit var lessonRepo: LessonRepo
    @Autowired
    lateinit var studentRepo: StudentRepo
    @Autowired
    lateinit var selectLessonRepo: SelectLessonRepo
    @Autowired
    lateinit var cache: Cache

    fun findStudent(id: String, term: String): Message {
        return Message(200,"all the students who has selected this course",cache.students(id,term))
    }

    fun create(req: LessonRequest): Message {
        log.info(req)
        // Todo: add new lesson to database
        val lesson = LessonEntity(
                lessonID = req.lessonId,
                term = req.term,
                lessonName = req.lessonName,
                weekDay = req.weekday.toByte(),
                period = req.period.toByte(),
                teachID = req.teachId,
                beginTime = req.datetime[0],
                endTime = req.datetime[1]
        )

        lessonRepo.save(lesson)
        log.debug(lesson)


        req.classNo.forEach {
            selectLessonRepo.addStudents(lesson.lessonID!!,lesson.term!!,it)
        }


        return Message(200,"lesson create successfully",lesson)
    }

}