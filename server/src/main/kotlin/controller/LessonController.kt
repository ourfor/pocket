package controller

import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import service.LessonService

@RequestMapping("/lessons")
@RestController
class LessonController : Controller() {

    @Autowired
    lateinit var service: LessonService

    @GetMapping("/{id}/{term}")
    fun findStudent(@PathVariable id: String,@PathVariable term: String): Message {
        log.info("lesson id $id, term is $term")
        return service.findStudent(id,term)
    }

}