package service

import database.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TeacherService : CommonService() {

    @Autowired
    lateinit var teacherRepo: TeacherRepo
    @Autowired
    lateinit var lessonRepo: LessonRepo
    @Autowired
    lateinit var roomRepo: RoomRepo

    fun info(id: Short): Map<String,Any> {
        val lessons = lessonRepo.findAllByTeachID(id)
        val rooms = roomRepo.findAll()
        return mapOf(
                "lessons" to lessons,
                "rooms" to rooms
        )
    }

}