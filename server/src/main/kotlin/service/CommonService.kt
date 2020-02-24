package service

import config.Config
import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
abstract class CommonService {

    @Autowired
    lateinit var log: Logger

    @Autowired
    final lateinit var env: Config

}
