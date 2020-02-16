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
              @RequestParam password: String): Message {
        val msg = Message()
        if(service.check(username,password))
            msg.setCode(StatusCode.UNAUTHORIZED)
                .setMsg("username or password was wrong")

        else msg.setCode(StatusCode.OK).setMsg(StatusCode.OK).setData("data-auth")
        return msg
    }

}