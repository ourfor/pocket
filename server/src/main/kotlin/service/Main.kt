package service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.scheduling.annotation.EnableScheduling

/**
 * @author ourfor
 * @date Feb 14, 2020
 * @description SpringBoot Main Class
 */

@SpringBootApplication
@ComponentScan("controller", "service" ,"database", "config", "log", "store","job")
@EntityScan("database")
@EnableJpaRepositories("database")
@EnableScheduling
@EnableCaching
class Application : SpringBootServletInitializer() {
    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(Application::class.java)
    }
}

fun main(vararg args: String) {
    runApplication<Application>(*args)
}