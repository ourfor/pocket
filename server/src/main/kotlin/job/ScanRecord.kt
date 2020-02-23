package job

import org.quartz.JobExecutionContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.quartz.QuartzJobBean
import org.springframework.stereotype.Component

@Component
class ScanRecord : QuartzJobBean() {

    @Autowired
    lateinit var service: ScanService

    override fun executeInternal(context: JobExecutionContext) {
        service.scan()
    }

}