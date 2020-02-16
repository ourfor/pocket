package controller

import message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import service.RoomService

@RequestMapping("/rooms")
@RestController
class RoomController {

    @Autowired
    lateinit var service: RoomService

    @GetMapping
    fun list(): Message {
        return Message(200,"all rooms",service.list())
    }

}