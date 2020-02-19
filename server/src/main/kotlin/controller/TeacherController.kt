package controller

import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import service.TeacherService

@RequestMapping("/teacher")
@RestController
class TeacherController {

    @Autowired
    lateinit var service: TeacherService

    @GetMapping("/lessons")
    fun info(@RequestParam id: Short): Message {
        return Message(200,"the teacher's lessons",service.info(id))
    }

}