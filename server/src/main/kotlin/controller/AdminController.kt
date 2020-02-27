package controller

import job.Todo
import message.AdminAuthData
import message.AdminAuthRequest
import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.AdminService
import tools.Md5

@RequestMapping("/admin")
@RestController
class AdminController : Controller() {

    @Autowired
    lateinit var service: AdminService
    @Autowired
    lateinit var todo: Todo


    @PostMapping("/register")
    fun register(@RequestParam username: String,
                 @RequestParam password: String,
                 @RequestParam md5: String): Message {
        return if(service.register(username,password,md5)) Message(200,"$username register successfully",null)
        else Message(StatusCode.BAD_REQUEST.value(),"username or password was modified",null)
    }

    @GetMapping("/config")
    fun config(@RequestParam frequent: Int?): Message {
        return if(frequent==null) {
            Message(200,"可配置设定",todo.getConfig())
        } else {
            todo.config(frequent)
            Message(200, "定时扫描频率修改为 $frequent 分钟一次", null)
        }
    }

    @PostMapping("/auth")
    fun auth(@RequestBody req: AdminAuthRequest): Message {
        return if(Md5.verify(req.data,"dashboard",req.md5))
            Message(StatusCode.BAD_REQUEST.value(),"request data has been modified by others",null)
        else service.check(req.data)
    }

}