package config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.stereotype.Component
import java.util.*

@Component
@PropertySource(factory= YamlBean::class,value= ["classpath:config.yml"])
class Config {
    @Value("\${date}")
    val date: String? = null

    @Value("\${config.scan.frequent}")
    var frequent: Int? = null

}

