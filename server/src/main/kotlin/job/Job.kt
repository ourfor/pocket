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

    @Throws(JobExecutionException::class)
    override fun executeInternal(context: JobExecutionContext) {
        logger!!.info("good")
    }
}