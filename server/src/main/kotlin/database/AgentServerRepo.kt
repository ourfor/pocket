package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface AgentServerRepo : CrudRepository<AgentServerEntity,Short> {
    fun findTopSvrIDOrderBySvrID(size: Short): Short?
    fun findBySvrCode(code: String): AgentServerEntity?
    fun findAllByOrderBySvrID(): List<AgentServerEntity>
}