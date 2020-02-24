package controller

import message.Message
import message.StatusCode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import service.RoomService
import java.sql.Timestamp

@RequestMapping("/rooms")
@RestController
class RoomController {

    @Autowired
    lateinit var service: RoomService

    @GetMapping
    fun list(): Message {
        return Message(200,"all rooms",service.list())
    }

    @PostMapping
    fun add(@RequestParam id: Short,
            @RequestParam name: String,
            @RequestParam count: Short,
            @RequestParam building: String): Message {
        val msg = if (service.add(id,name,count,building)) Message(StatusCode.OK.value(),"add successfully",null)
        else Message(400,"add failed",null)
        return msg
    }

    @GetMapping("/usable")
    fun usable(@RequestParam start: Timestamp,
               @RequestParam end: Timestamp): Message {
        return Message(200,"all the usable rooms",service.usable(start,end))
    }

}