package controller

import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.StudentService

@RequestMapping("/student")
@RestController
class StudentController : Controller() {

    @Autowired
    lateinit var service: StudentService

    /**
     * @description sign up by using MAC and studId(first use, not null)
     */
    @PostMapping("/sign-in")
    fun signIn(@RequestParam MAC: String, @RequestParam studId: String?): Message {
        val student = service.add(MAC,studId)
        return when(student["stuName"]) {
            "undefined" -> Message(StatusCode.BAD_REQUEST.value(),"this student is not exist",null)
            else  -> Message(
                        StatusCode.OK.value(),
                        "${student["stuName"]} sign up successful",
                        student
                    )
        }
    }

    @GetMapping
    fun default(): Message {
        log.info("开始查询")
        val msg = Message(200,"all student",service.all())
        log.info(msg)
        return msg
    }

    @GetMapping("/all")
    fun all(): Message {
        log.info("开始查询")
        val msg = Message(200,"all student",service.all())
        log.info(msg)
        return msg
    }
}