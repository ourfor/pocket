package database

import org.hibernate.dialect.SQLServerDialect
import org.hibernate.type.StandardBasicTypes
import java.sql.Types

class Dialect : SQLServerDialect() {
    init {
        registerHibernateType(Types.NCHAR, 2, StandardBasicTypes.STRING.name)
    }
}