package controller

import message.AuthRequest
import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.AuthService


@RequestMapping("/auth")
@RestController
class AuthController {

    @Autowired
    lateinit var service: AuthService


    @PostMapping
    fun login(@RequestBody req: AuthRequest): Message {
        return if(!service.check(req.data,req.md5)) Message(StatusCode.UNAUTHORIZED.value(),"data was modified by other",null)
        else {
            val info = service.login(req.data)
            if(info["check"] == true) {
                Message(200,"login successful",info)
            } else {
                Message(StatusCode.UNAUTHORIZED.value(),"username or password wrong",info)
            }
        }
    }
}