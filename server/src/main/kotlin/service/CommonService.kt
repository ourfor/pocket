package service

import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import tools.Md5

@Service
abstract class CommonService {

    @Autowired
    lateinit var log: Logger
}
