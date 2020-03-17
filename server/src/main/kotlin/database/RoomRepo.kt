package database

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.sql.Timestamp
import javax.transaction.Transactional

@Repository
@Transactional
interface RoomRepo : CrudRepository<RoomEntity,Short> {
    @Query(value="exec sp_find_usable_room ?1,?2",nativeQuery = true)
    fun findUsableRoom(start: Timestamp,end: Timestamp): List<RoomEntity>

    fun findByRoomID(roomID: Short): RoomEntity?
}