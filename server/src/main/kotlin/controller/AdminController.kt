package controller

import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import service.AdminService

@RequestMapping("/auth")
@RestController
class AdminController : Controller() {

    @Autowired
    lateinit var service: AdminService

    @PostMapping
    fun login(@RequestParam username: String,
              @RequestParam password: String,
              @RequestParam md5: String): Message {
        val msg = Message()
        if(service.check(username,password,md5))
            msg.setCode(StatusCode.UNAUTHORIZED)
                .setMsg("username or password was wrong")

        else msg.setCode(StatusCode.OK).setMsg(StatusCode.OK).setData("data-auth")
        return msg
    }

    @PostMapping("/register")
    fun register(@RequestParam username: String,
                 @RequestParam password: String,
                 @RequestParam md5: String): Message {
        return if(service.register(username,password,md5)) Message(200,"$username register successfully",null)
        else Message(StatusCode.BAD_REQUEST.value(),"username or password was modified",null)
    }

}