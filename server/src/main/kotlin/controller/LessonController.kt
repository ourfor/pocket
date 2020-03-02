package controller

import message.LessonRequest
import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
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

    @PostMapping
    fun create(@RequestBody req: LessonRequest): Message {
        return service.create(req)
    }

}