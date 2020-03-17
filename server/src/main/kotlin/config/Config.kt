package config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.stereotype.Component

@Component
@PropertySource(factory= YamlBean::class,value= ["classpath:config.yml"])
class Config {

    @Value("\${config.scan.frequent}")
    var frequent: Int? = null

    @Value("\${config.heartbeat}")
    var heartbeat: Int? = null

}

