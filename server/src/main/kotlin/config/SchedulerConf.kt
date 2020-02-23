package config

import org.quartz.Scheduler
import org.quartz.SchedulerException
import org.quartz.spi.TriggerFiredBundle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.config.AutowireCapableBeanFactory
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.quartz.SchedulerFactoryBean
import org.springframework.scheduling.quartz.SpringBeanJobFactory
import org.springframework.stereotype.Component

/**
 * @description quartz job configuration, quartz配置类, 解决job无法注入Bean的问题
 */
@Configuration
class SchedulerConfiguration {
    @Configuration
    inner class AutowireCapableBeanJobFactory @Autowired
        constructor(private val beanFactory: AutowireCapableBeanFactory) : SpringBeanJobFactory() {
        @Throws(Exception::class)
        override fun createJobInstance(bundle: TriggerFiredBundle): Any {
            val jobInstance = super.createJobInstance(bundle)
            beanFactory.autowireBean(jobInstance)
            beanFactory.initializeBean(jobInstance, null.toString())
            return jobInstance
        }

    }

    @Bean
    fun schedulerFactory(applicationContext: ApplicationContext): SchedulerFactoryBean {
        val schedulerFactoryBean = SchedulerFactoryBean()
        schedulerFactoryBean.setJobFactory(
                AutowireCapableBeanJobFactory(
                        applicationContext.autowireCapableBeanFactory
                )
        )
        return schedulerFactoryBean
    }

    @Bean
    @Throws(SchedulerException::class)
    fun scheduler(applicationContext: ApplicationContext): Scheduler {
        val scheduler = schedulerFactory(applicationContext).scheduler
        scheduler.start()
        return scheduler
    }
}