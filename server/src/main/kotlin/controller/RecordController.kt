package controller

import message.Message
import message.RecordRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.RecordService
import java.sql.Timestamp

@RequestMapping("/record")
@RestController
class RecordController : Controller() {

    @Autowired
    lateinit var service: RecordService

    @PostMapping
    fun create(@RequestBody req: RecordRequest): Message {
        service.create(req)
        return Message(200,"record init successful","考勤记录创建成功")
    }

    @GetMapping
    fun view(@RequestParam teachId: Short,
             @RequestParam beginTime: String): Message {
        return Message(200,"all the records",service.view(teachId,beginTime))
    }

    @GetMapping("/search")
    fun view(@RequestParam lessonId: String,
             @RequestParam term: String,
             @RequestParam beginTime: Timestamp): Message {
        val data = service.view(lessonId,term,beginTime)
        return Message(200,"all the record at this",data)
    }

    @GetMapping("/time")
    fun view(@RequestParam teachId: Short): Message {
        return Message(200,"course and time",service.view(teachId))
    }

    @GetMapping("/todo")
    fun todo(@RequestParam teachId: Short): Message {
        log.info("teachId: $teachId")
        return Message(200,"course and time",service.todo(teachId))
    }

}