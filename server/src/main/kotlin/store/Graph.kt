package store

import graphql.GraphQL
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.SchemaParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Repository
import javax.annotation.PostConstruct

@Repository
class Graph {
    @Autowired
    lateinit var fetcher: Fetcher
    @Autowired
    lateinit var resource: ResourceLoader

    @get:Bean
    lateinit var graphql: GraphQL


    @PostConstruct
    fun init() {
        val input = resource.getResource("classpath:/graphql/query.gql").inputStream
        val type = SchemaParser().parse(input)
        val wiring = fetcher.buildWiring()
        val schema = SchemaGenerator().makeExecutableSchema(type,wiring)
        this.graphql = GraphQL.newGraphQL(schema).build()
    }

}