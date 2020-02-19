package controller

import message.Message
import message.RecordRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import service.RecordService

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

}