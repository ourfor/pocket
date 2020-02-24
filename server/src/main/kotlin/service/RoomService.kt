package service

import database.RoomEntity
import database.RoomRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache
import java.sql.Timestamp

@Service
class RoomService: CommonService() {

    @Autowired
    lateinit var roomRepo: RoomRepo
    @Autowired
    lateinit var cache: Cache

    fun list(): List<RoomEntity> = cache.roomMap.values.toList()

    fun add(id: Short, name: String, count: Short, building: String): Boolean {
        return try{
            val room = RoomEntity(id,name,count,building)
            log.info(room)
            roomRepo.save(room)
           true
        } catch (e: Exception) {
            false
        }
    }

    fun usable(start: Timestamp, end: Timestamp): List<*> {
        return roomRepo.findUsableRoom(start,end)
    }

}