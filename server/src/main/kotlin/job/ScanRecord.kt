package job

import database.AttendRecEntity
import database.AttendRecRepo
import org.quartz.JobExecutionContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.quartz.QuartzJobBean
import org.springframework.stereotype.Component
import java.util.Date
import java.sql.Timestamp

@Component
class ScanRecord : QuartzJobBean() {
    @Autowired
    lateinit var recordRepo: AttendRecRepo

    override fun executeInternal(context: JobExecutionContext) {
        // get all the records that is not over
        val recs = recordRepo.findAllByIsOverFalse()
        val done = ArrayList<AttendRecEntity>()

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
                val now = Timestamp(Date().time)
                if(now.after(it.endTime)) it.attendTag = 3
            }

            done.add(it)
        }

        recordRepo.saveAll(done)
    }

}