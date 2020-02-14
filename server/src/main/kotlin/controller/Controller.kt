package controller

import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
abstract class Controller {
    @Autowired
    lateinit var log: Logger
}