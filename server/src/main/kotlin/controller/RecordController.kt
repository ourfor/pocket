package controller

import message.Message
import message.RecordRequest
import message.StatusCode
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

    /**
     * @param lessonId 课程Id
     * @param term 开课学期
     * @param beginTime 考勤记录开始时间
     * @description 通过课程id和开课学期以及考勤记录开始时间获得考勤记录
     */
    @GetMapping("/search")
    fun view(@RequestParam lessonId: String,
             @RequestParam term: String,
             @RequestParam beginTime: Timestamp): Message {
        val data = service.view(lessonId,term,beginTime)
        return Message(200,"all the record at this time",data)
    }

    /**
     * @param teachId teacher's id
     * @description get records time
     */
    @GetMapping("/time")
    fun view(@RequestParam teachId: Short?,
             @RequestParam stuId: String?): Message {
        return when {
            teachId != null -> Message(200,"course and time",service.view(teachId))
            stuId != null -> Message(200,"course and time",service.viewStudent(stuId))
            else -> Message(StatusCode.BAD_REQUEST.value(),"stuId and teachId can't be null at the same time",null)
        }
    }

    /**
     * @param teachId teacher's id
     * @description get records that require sign
     */
    @GetMapping("/todo")
    fun todo(@RequestParam teachId: Short): Message {
        log.info("get todo list with teachId: $teachId")
        return Message(200,"course and time",service.todo(teachId))
    }

    @DeleteMapping
    fun delete(@RequestParam lessonId: String,
               @RequestParam term: String,
               @RequestParam room: Short,
               @RequestParam beginTime: Timestamp,
               @RequestParam endTime: Timestamp): Message {
        return service.delete(lessonId,term,room,beginTime,endTime)
    }

}