package service

import database.AgentServerEntity
import database.AgentServerRepo
import message.Message
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
        // if this devices has already registered, return register information
        cache.agentSvrList.forEach {
            svr ->
            if(svr.svrCode == code) return svr.json()
        }

        // else register
        log.info("register new device with $code")
        val key = UUID.randomUUID().toString()

        var id = if(cache.agentSvrList.isEmpty()) 0
        else cache.agentSvrList.last().svrID!!

        val svr = AgentServerEntity(++id,code,version,key,room, exception = false, online = true, state = "启用")
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

    fun all(): Any? = cache.agentSvrList
    fun online(id: Short, time: Long, exception: Boolean) {
        agentServerRepo.checkOnline(id,true,exception)
    }

    fun heart(id: Short): Message {
        cache.onlineMap[id] = true
        val result = cache.agentServerRepo.checkOnline(id,online = true,exception = false)
        return if(result!=null)
            Message(200,"success",result)
        else
            Message(404,"can't find this device",null)

    }

    fun state(id: Short, status: String): Message {
        val device = agentServerRepo.findBySvrID(id)
        val result = Message().setMsg("can't find agent device with id $id")
        device?.let {
            it.state = status
            try {
                agentServerRepo.save(it)
                result.setMsg("success")
            } catch (e: Exception) {
                log.error(e)
                result.setMsg("error to save state: $e")
            }
        }
        return result
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

data class HeartResp(
        val id: Short,
        val status: String
)

