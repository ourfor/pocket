package service

import database.RoomEntity
import database.RoomRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache

@Service
class RoomService {

    @Autowired
    lateinit var roomRepo: RoomRepo
    @Autowired
    lateinit var cache: Cache

    fun list(): List<RoomEntity> = cache.roomMap.values.toList()


}