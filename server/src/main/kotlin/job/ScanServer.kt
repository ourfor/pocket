package job

import database.AttendRecEntity
import database.AttendRecRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import service.CommonService
import java.sql.Timestamp
import java.util.*
import kotlin.collections.ArrayList

@Service
class ScanServer : CommonService() {
    @Autowired
    lateinit var recordRepo: AttendRecRepo

    @Scheduled(fixedRate = 10 * 60 * 1000) // 10 minutes a time
    fun scan() {
        log.info("start to scan those records that was not over")
        // get all the records that is not over
        val recs = recordRepo.findAllByIsOverFalse()
        val done = ArrayList<AttendRecEntity>()
        val now = Timestamp(Date().time)

        log.info("find ${recs.size} records that are not over")
        recs.forEach {
            // 1. refresh time is early than end time
            val refreshTime = it.refreshTime
            if(refreshTime!!.before(it.endTime)) {
                //1.a bluetooth exception or phone power off
                if(it.phoneIn!!) it.BTException = true
                //1.b early leave, use tag 2
                else it.attendTag = 2
            } else {
                //2. class was over
                if(now.after(it.endTime)) it.attendTag = 3
                it.isOver = true
            }

            if(now.after(it.endTime)) it.isOver = true

            done.add(it)
        }

        recordRepo.saveAll(done)
    }
}