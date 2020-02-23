package job

import org.apache.logging.log4j.Logger
import org.quartz.JobExecutionContext
import org.quartz.JobExecutionException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.quartz.QuartzJobBean
import org.springframework.stereotype.Component

@Component
class Job : QuartzJobBean() {
    @Autowired
    private val logger: Logger? = null
    @Autowired
    private lateinit var service: ScanService

    @Throws(JobExecutionException::class)
    override fun executeInternal(context: JobExecutionContext) {
        logger!!.info("hello, I am the thread that scan not over records")
        service.scan()
    }
}