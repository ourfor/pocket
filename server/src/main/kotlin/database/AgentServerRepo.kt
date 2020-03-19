package database

import org.springframework.data.jpa.repository.Query
import org.springframework.data.jpa.repository.query.Procedure
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface AgentServerRepo : CrudRepository<AgentServerEntity,Short> {
    fun findBySvrID(id: Short): AgentServerEntity?
    fun findTopSvrIDOrderBySvrID(size: Short): Short?
    fun findTopByRoomID(room: Short): AgentServerEntity?
    fun findBySvrCode(code: String): AgentServerEntity?
    fun findAllByOrderBySvrID(): List<AgentServerEntity>
    @Procedure(procedureName = "sp_check_online")
    fun checkOnline(id: Short, online: Boolean, exception: Boolean)
    @Query(value="exec sp_update_device_room_id ?1, ?2",nativeQuery = true)
    fun updateRoomID(svrId: Short, room: Short): AgentServerEntity?
}