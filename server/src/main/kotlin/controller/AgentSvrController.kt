package controller

import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.AgentSvrServer

@RequestMapping("/agent")
@RestController
class AgentSvrController {

    @Autowired
    lateinit var service: AgentSvrServer

    @PostMapping
    fun register(@RequestParam code: String,
                 @RequestParam version: String,
                 @RequestParam room: Short): Message {
        return when(val data = service.register(code,room,version)) {
            null -> Message(StatusCode.BAD_REQUEST.value(),"device $code register failed",null)
            else -> Message(StatusCode.OK.value(),"device $code register successful",data)
        }
    }

    @PatchMapping
    fun exception(@RequestParam("SvrCode") code: String,
                  @RequestParam("isException") status: Boolean): Message {
        if(status) service.exceptionDevice(code)
        return Message(StatusCode.OK.value(),"exception device add",null)
    }

    @GetMapping("/all")
    fun all(): Message {
        return Message(200,"all the agent server devices",service.all())
    }

    @GetMapping("/online")
    fun online(@RequestParam("SvrID") id: Short,
               @RequestParam time: Long,
               @RequestParam("isException") exception: Boolean): Message {
        service.online(id,time,exception)
        return Message(200,"update online status",null)
    }
}