package job

import org.apache.logging.log4j.Logger
import org.quartz.JobExecutionContext
import org.quartz.JobExecutionException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.quartz.QuartzJobBean
import org.springframework.stereotype.Component

@Component
class ScanJob : QuartzJobBean() {
    @Autowired
    private lateinit var logger: Logger
    @Autowired
    private lateinit var service: ScanService

    @Throws(JobExecutionException::class)
    override fun executeInternal(context: JobExecutionContext) {
        logger.info("hello, I am the thread that scans not complete records")
        service.scan()
    }
}

@Component
class HeartJob: QuartzJobBean() {
    @Autowired
    private lateinit var logger: Logger

    @Autowired
    private lateinit var service: HeartService

    override fun executeInternal(context: JobExecutionContext) {
        logger.info("hello, I am the thread that checks agent server heartbeat")
        service.start()
    }
}