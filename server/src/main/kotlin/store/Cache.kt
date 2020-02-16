package store

import database.AgentServerRepo
import database.RoomEntity
import database.RoomRepo
import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Repository
import javax.annotation.PostConstruct

@Repository
class Cache {

    @Autowired
    lateinit var log: Logger
    @Autowired
    lateinit var agentServerRepo: AgentServerRepo
    @Autowired
    lateinit var roomRepo: RoomRepo

    val svrKeyMap = HashMap<Short,String>()
    val roomMap = HashMap<Short,RoomEntity>()

    @PostConstruct
    fun init() {
       log.info("init cache")
       roomRepo.findAll().forEach { room ->
           roomMap[room.roomID!!] = room
       }

    }

    @Scheduled(fixedRate = 60 * 1000)
    fun fresh() {
        val temp = HashMap<Short,String>()
        val svrlist = agentServerRepo.findAll()
        svrlist.forEach {
            svr ->
            temp[svr.svrID!!] = svr.svrKey!!
        }
        svrKeyMap.clear()
        svrKeyMap.putAll(temp)
    }
}