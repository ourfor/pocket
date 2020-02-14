package log

import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import service.Application

/**
 * @author ourfor
 * @description almost controller instance can use this log framework, Logger instance is Singleton
 */

@Component
class LogUtil {

    private val logger: Logger = LogManager.getLogger(Application::class)

    @Bean fun getLogger(): Logger = this.logger

}