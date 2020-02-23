package controller

import job.Todo
import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.AdminService

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
    fun config(@RequestParam frequent: Int): Message {
        todo.config(frequent)
        return Message(200,"定时扫描频率修改为 $frequent 分钟一次",null)
    }

}