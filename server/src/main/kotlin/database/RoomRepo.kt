package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface RoomRepo : CrudRepository<RoomEntity,Short>