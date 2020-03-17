package job

import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import store.Cache

@Service
class HeartService {

    @Autowired
    lateinit var cache: Cache
    @Autowired
    lateinit var log: Logger

    fun start() {
        log.info("--- ${cache.onlineMap.size} devices online ---")
        val devices = cache.agentServerRepo.findAll()
        devices.forEach {
            it.online = cache.onlineMap[it.svrID]?:false
        }
        cache.agentServerRepo.saveAll(devices)
        cache.onlineMap.clear()
    }
}