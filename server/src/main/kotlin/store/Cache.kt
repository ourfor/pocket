package store

import database.AgentServerEntity
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
    val agentSvrList = ArrayList<AgentServerEntity>()
    val svrMap = HashMap<Short,AgentServerEntity>()

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
        val svrList = agentServerRepo.findAllByOrderBySvrID()
        svrList.forEach {
            svr ->
            temp[svr.svrID!!] = svr.svrKey!!
            svrMap[svr.svrID!!] = svr
        }
        agentSvrList.clear()
        agentSvrList.addAll(svrList)
        svrKeyMap.clear()
        svrKeyMap.putAll(temp)
    }
}