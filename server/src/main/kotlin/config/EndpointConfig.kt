//package config
//
//import controller.RecordSocket
//import org.apache.logging.log4j.Logger
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.context.ApplicationContext
//import org.springframework.context.annotation.*
//import org.springframework.core.type.AnnotatedTypeMetadata
//import org.springframework.lang.Nullable
//import org.springframework.scheduling.TaskScheduler
//import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler
//import org.springframework.web.socket.config.annotation.EnableWebSocket
//import org.springframework.web.socket.server.standard.ServerEndpointExporter
//
//
//@Configuration
//@EnableWebSocket
//class EndpointConfig {
//    @Autowired lateinit var log: Logger
//    @Autowired lateinit var ac: ApplicationContext
//
//    @Bean
//    fun context(): SocketContext {
//        return SocketContext()
//    }
//
//
//    @Bean
//    fun recordSocket(): RecordSocket {
//        return RecordSocket(log)
//    }
//
//    @Bean
//    @Nullable
//    fun taskScheduler(): TaskScheduler? {
//        val threadPoolScheduler = ThreadPoolTaskScheduler()
//        threadPoolScheduler.setThreadNamePrefix("SockJS-")
//        threadPoolScheduler.poolSize = Runtime.getRuntime().availableProcessors()
//        threadPoolScheduler.isRemoveOnCancelPolicy = true
//        return threadPoolScheduler
//    }
//
//    @Bean
//    @Conditional(isJar::class)
//    fun exporter(): ServerEndpointExporter {
//        return ServerEndpointExporter()
//    }
//
//}
//
///**
// * 条件装载，如果部署的是war包，就不使用exporter，否则使用. 解决的错误
// * Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'exporter' defined in class path resource [config/EndpointConfig.class]: Invocation of init method failed; nested exception is java.lang.IllegalStateException: javax.websocket.server.ServerContainer not available
// */
//class isJar: Condition {
//    override fun matches(context: ConditionContext, metadata: AnnotatedTypeMetadata): Boolean {
//        val env = context.environment;
//        val packageStyle = env.getProperty("deploy.type")
//        return packageStyle=="jar"
//    }
//}