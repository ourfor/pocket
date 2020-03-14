import org.quartz.DateBuilder.dateOf
import org.quartz.JobBuilder.newJob
import org.quartz.JobExecutionContext
import org.quartz.SimpleScheduleBuilder.simpleSchedule
import org.quartz.TriggerBuilder.newTrigger
import org.quartz.impl.StdSchedulerFactory
import org.springframework.scheduling.quartz.QuartzJobBean
import java.text.SimpleDateFormat


class JobHello : QuartzJobBean() {
    lateinit var name: String
    var age: Int = 0

    override fun executeInternal(context: JobExecutionContext) {
//        val dataMapp = context.jobDetail.jobDataMap
//        val name = namedataMap["name"] as String
        val dataMap = context.mergedJobDataMap

        println("I am the job, Hello, $name, you are $age years old")
    }

}

fun main(vararg args: String) {
    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
    val schFact = StdSchedulerFactory()
    val sch = schFact.scheduler

    val job1 = newJob(JobHello::class.java)
            .withIdentity("hello","greeting")
            .usingJobData("name","李白")
            .usingJobData("age",20)
            .build()
    val trigger = newTrigger()
            .withIdentity("trigger","clock")
            .startNow()
            .withSchedule(simpleSchedule()
                    .withIntervalInSeconds(40)
                    .repeatForever())
            .build()

    val trigger1 = newTrigger()
            .withIdentity("time","clock")
            .startAt(dateOf(21,25,40))
            .build()

    sch.scheduleJob(job1,trigger1)

    sch.start()

    val date = sdf.parse("2020-02-20 21:27:00")

}