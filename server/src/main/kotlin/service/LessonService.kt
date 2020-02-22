package service

import database.LessonRepo
import database.StudentRepo
import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache

@Service
class LessonService : CommonService() {
    @Autowired
    lateinit var lesssonRepo: LessonRepo
    @Autowired
    lateinit var cache: Cache

    fun findStudent(id: String, term: String): Message {
        return Message(200,"all the students who has selected this course",cache.students(id,term))
    }

}