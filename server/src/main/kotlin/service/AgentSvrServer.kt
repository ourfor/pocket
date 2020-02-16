package service

import database.AgentServerEntity
import database.AgentServerRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class AgentSvrServer : CommonService() {

    @Autowired
    lateinit var agentServerRepo: AgentServerRepo

    fun register(code: String,room: Short, version: String): Map<String,Any?>? {
        val key = UUID.randomUUID().toString()
        val id = agentServerRepo.findTopSvrIDOrderBySvrIDDesc(1)?:0
        val agentSvr = AgentServerEntity((id+1).toShort(),code,version,key,room, exception = false, online = true)
        return try {
            agentServerRepo.save(agentSvr)
            mapOf(
                    "svrkey" to agentSvr.svrKey,
                    "svrid" to agentSvr.svrID
            )
        } catch (e: Exception) {
            log.error("error to save $code device to database")
            null
        }
    }

    fun exceptionDevice(code: String) {
        val svr = agentServerRepo.findBySvrCode(code)
        svr?.let {
            it.exception = true
            agentServerRepo.save(it)
        }
    }
}