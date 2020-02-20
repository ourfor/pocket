package config

import org.quartz.Scheduler
import org.quartz.impl.StdSchedulerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class JobConfig {

    @Bean("scheduler")
    fun scheduler(): Scheduler {
        val schFact = StdSchedulerFactory()
        val scheduler = schFact.scheduler
        scheduler.start()
        return scheduler
    }

}