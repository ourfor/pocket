package controller

import message.Message
import message.SignRequest
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.StudentService
import tools.Md5
import java.util.*

@RequestMapping("/student")
@RestController
class StudentController : Controller() {

    @Autowired
    lateinit var service: StudentService

    @GetMapping("/classes")
    fun info(): Message {
        log.debug("application running at debug level")
        return Message(200,"all the classes of students",service.info())
    }
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
                        "${student["stuName"]} sign up successfully",
                        student
                    )
        }
    }

    @PostMapping("/sign-in-all")
    fun signInList(@RequestBody req: SignRequest): Message {
        log.info(req)
        val time = req.data.time
        val now = System.currentTimeMillis()
        return if((now - time !in -60_000..60_000)) { // 请求超过1分钟, 超时, 不同时区，误差范围修改
            log.info("now - req.time: ${now - time}")
            Message(StatusCode.REQUEST_TIMEOUT.value(),"request timeout or requests are to frequent",null)
        } else {
            log.info("now - req.time = ${now - time}")
            val svrKey = service.svrKey(req.data.appId)

            if (Md5.verify(req.data, svrKey
                            ?: "", req.md5.toLowerCase())){
                log.info("sign in start")
                service.addAll(req.data.data, svrKey!!, req.data.appId)
            } else {
                log.warn("md5 error")
                val key = svrKey?.replace(
                        "(\\w{8})-(\\w{4})-(\\w{4})-(\\w{4})-(\\w{12})".toRegex(),
                        "$1-****-****-****-$5")
                log.info("agent server svrKey is $key")

                Message(StatusCode.UNAUTHORIZED.value(), "md5 error", null)
            }
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

    /**
     * @param id Student ID
     * @description get all select lessons and records
     */
    @GetMapping("/lessons")
    fun lessons(id: String): Message {
        return service.lessons(id)
    }

    /**
     * @param id student id, 学生学号
     * @param nickname student name, 学生昵称
     * @param sex student sex, 学生性别
     * @param mac student bluetooth MAC address, 学生蓝牙地址
     * @description update student information, 更新学生信息
     */
    @PatchMapping
    fun update(@RequestParam id: String,
               @RequestParam nickname: String?,
               @RequestParam sex: Boolean?,
               @RequestParam mac: String?): Message {
        return if(nickname==null && sex==null && mac == null)
            Message(200,"nothing require update",null)
        else service.update(id,nickname,sex,mac)
    }
}