package job

import org.quartz.DateBuilder.dateOf
import org.quartz.JobBuilder.newJob
import org.quartz.JobDetail
import org.quartz.JobExecutionContext
import org.quartz.Scheduler
import org.quartz.SimpleScheduleBuilder.simpleSchedule
import org.quartz.Trigger
import org.quartz.TriggerBuilder.newTrigger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.scheduling.quartz.QuartzJobBean
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat

@Service
class Todo {

    @Qualifier("scheduler")
    @Autowired
    lateinit var tasks: Scheduler

    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")


    fun add(job: JobDetail, trigger: Trigger) {
        tasks.scheduleJob(job,trigger)
    }

    fun runAt(time: String) {
        val date = sdf.parse(time)
        val job = newJob(MyJob::class.java)
                .withIdentity("$time-job","task")
                .build()

        val trigger = newTrigger()
                .withIdentity(time,"fixedTime")
                .startAt(dateOf(date.hours,date.minutes,date.seconds,date.date,date.month+1,date.year+1900))
                .build()
        tasks.scheduleJob(job,trigger)
    }

}

class MyJob : QuartzJobBean() {
    override fun executeInternal(context: JobExecutionContext) {
        println("I am the job")
    }
}