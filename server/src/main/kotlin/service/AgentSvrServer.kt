package service

import database.AgentServerEntity
import database.AgentServerRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache
import java.util.*

@Service
class AgentSvrServer : CommonService() {

    @Autowired
    lateinit var agentServerRepo: AgentServerRepo
    @Autowired
    private lateinit var cache: Cache

    /**
     * @param code agent server code identifier
     * @param room room id, where agent in
     * @param version agent server software version
     */
    fun register(code: String,room: Short, version: String): Map<String,Any?>? {
        cache.agentSvrList.forEach {
            svr ->
            if(svr.svrCode == code) return svr.json()
        }

        log.info("register new device with $code")
        val key = UUID.randomUUID().toString()

        var id = if(cache.agentSvrList.isEmpty()) 0
        else cache.agentSvrList.last().svrID!!

        val svr = AgentServerEntity(++id,code,version,key,room, exception = false, online = true)
        return try {
            log.info(svr)
            agentServerRepo.save(svr)
            cache.agentSvrList.add(svr)
            svr.json()
        } catch (e: Exception) {
            log.error("error to save $code device to database")
            null
        }
    }

    /**
     * @param code agent server code identifier
     */
    fun exceptionDevice(code: String) {
        val svr = agentServerRepo.findBySvrCode(code)
        svr?.let {
            it.exception = true
            agentServerRepo.save(it)
        }
    }
}

private fun AgentServerEntity.json() = mapOf(
        "SvrKey" to this.svrKey,
        "SvrId" to this.svrID,
        "SvrCode" to this.svrCode,
        "Version" to this.version,
        "RoomID" to this.roomID,
        "Exception" to this.exception,
        "Online" to this.online
)

