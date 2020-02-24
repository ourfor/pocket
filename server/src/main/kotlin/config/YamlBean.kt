package config


import org.springframework.boot.env.YamlPropertySourceLoader
import org.springframework.core.env.PropertySource
import org.springframework.core.io.support.DefaultPropertySourceFactory
import org.springframework.core.io.support.EncodedResource
import org.springframework.lang.Nullable
import java.io.IOException


/**
 * @description read config from yaml file and convert it to bean
 */
class YamlBean : DefaultPropertySourceFactory() {
    @Throws(IOException::class)
    override fun createPropertySource(@Nullable name: String?, resource: EncodedResource): PropertySource<*> {
        val propertySourceList = YamlPropertySourceLoader().load(resource.resource.filename, resource.resource)
        return if (propertySourceList.isNotEmpty()) {
            propertySourceList.iterator().next()
        } else super.createPropertySource(name, resource)
    }
}