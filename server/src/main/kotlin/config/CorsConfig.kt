package config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableMBeanExport
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.jmx.support.RegistrationPolicy
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


/**
 * @description this configuration is used to disable cors
 */

@Configuration
@EnableMBeanExport(registration= RegistrationPolicy.IGNORE_EXISTING)
class Config {
    @Bean
    fun corsConfigurer(): WebMvcConfigurer? {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET","POST","DELETE","PUT","PATCH","OPTIONS")
            }
        }
    }

}


@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class SimpleCORSFilter : Filter {

    override fun destroy() {
    }

    override fun init(filterConfig: FilterConfig?) {
    }

    override fun doFilter(req: ServletRequest, resp: ServletResponse,
                          chain: FilterChain) {
        val response = resp as HttpServletResponse
        val request = req as HttpServletRequest
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
        response.setHeader("Access-Control-Max-Age", "3600")
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN")
        if ("OPTIONS".equals(request.method, ignoreCase = true)) {
            response.status = HttpServletResponse.SC_OK
        } else {
            chain.doFilter(req, resp)
        }
    }
}

