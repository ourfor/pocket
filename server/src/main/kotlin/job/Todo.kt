package job

import config.Config
import org.apache.logging.log4j.Logger
import org.quartz.JobBuilder.newJob
import org.quartz.JobDetail
import org.quartz.Scheduler
import org.quartz.SimpleScheduleBuilder.simpleSchedule
import org.quartz.Trigger
import org.quartz.TriggerBuilder.newTrigger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

@Service
class Todo : CommandLineRunner {

    @Qualifier("scheduler")
    @Autowired
    lateinit var tasks: Scheduler
    @Autowired
    lateinit var log: Logger
    @Autowired
    final lateinit var env: Config

    companion object Store {
        var frequent: Int = 10 // 扫描频率10分钟一次, 可以动态配置
    }

    @PostConstruct
    fun init() {
        env.frequent?.let {
            Store.frequent = frequent
            log.info("read config file, set scan frequent to $frequent minutes a time")
        }
    }

    fun add(job: JobDetail, trigger: Trigger) {
        tasks.scheduleJob(job,trigger)
    }

    fun clear() {
        log.info("clear all tasks")
        tasks.clear()
    }

    fun config(frequent: Int) {
        Store.frequent = frequent
        log.info("clear all tasks, set new frequent")
        tasks.clear()
        start()
    }

    fun start() {
        val time = System.currentTimeMillis()
        val job = newJob(Job::class.java)
                .withIdentity("$time-job","task")
                .storeDurably()
                .build()

        val trigger = newTrigger()
                .withIdentity("$time","fixedTime")
                .startNow()
                .withSchedule(simpleSchedule().withIntervalInMinutes(frequent).repeatForever())
                .build()
        tasks.scheduleJob(job,trigger)
    }

    override fun run(vararg args: String?) {
        log.info("start scan task")
        start()
    }

}

