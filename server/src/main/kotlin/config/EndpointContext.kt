package config

import org.springframework.beans.factory.BeanFactory
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware as ContextAware
import javax.websocket.server.ServerEndpointConfig.Configurator as EndpointConfig

/**
 * @description websocket context configuration
 */
class EndpointContext : EndpointConfig(), ContextAware {
    companion object {
        @Volatile
        lateinit var context: BeanFactory
    }

    override fun setApplicationContext(p0: ApplicationContext) {
        context = p0
    }

    @Throws(InstantiationException::class)
    override fun <T> getEndpointInstance(clazz: Class<T>): T {
        return context.getBean(clazz)
    }
}