package controller

import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import service.AdminService

@RequestMapping("/admin")
@RestController
class AdminController : Controller() {

    @Autowired
    lateinit var service: AdminService


    @PostMapping("/register")
    fun register(@RequestParam username: String,
                 @RequestParam password: String,
                 @RequestParam md5: String): Message {
        return if(service.register(username,password,md5)) Message(200,"$username register successfully",null)
        else Message(StatusCode.BAD_REQUEST.value(),"username or password was modified",null)
    }

}