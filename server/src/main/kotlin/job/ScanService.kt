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
class ScanService : CommonService() {
    @Autowired
    lateinit var recordRepo: AttendRecRepo

//    @Scheduled(fixedRate = 10 * 60 * 1000) // 10 minutes a time 10分钟扫描一次未完结的考勤记录
    fun scan() {
        log.info("start to scan those records that was not over")
        // get all the records that is not over 获取所有未完结的考勤记录
        val recs = recordRepo.findAllByIsOverFalse()
        val done = ArrayList<AttendRecEntity>()
        val now = Timestamp(System.currentTimeMillis())

        log.info("find ${recs.size} records that are not over")
        recs.forEach {
            // 1. refresh time is not null 刷新时间为不为空,
            if(it.refreshTime != null) {
                //1. 该考勤记录的最后刷新时间早于本下课时间
                if(it.refreshTime!!.before(it.endTime)) {
                    //1.a bluetooth exception or phone power off, 手机在袋中, 标记蓝牙异常
                    if (it.phoneIn!!) it.BTException = true
                    //1.b early leave, use tag 2, 手机不在袋中, 标记为早退
                    else if (!it.phoneIn!!) it.leaveEarly = true
                }

            } else {
                //2. class was over 刷新时间等于课程开始时间并且扫描时间已经到了下课时间，标记为旷课
                if(now.after(it.endTime)) {
                    it.attendTag = 3
                }
            }

            if(now.after(it.endTime)) it.isOver = true

            done.add(it)
        }

        recordRepo.saveAll(done)
    }
}