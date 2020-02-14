package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
interface StudentRepo : CrudRepository<StudentEntity,String> {
    fun findByStuID(stuId: String): StudentEntity?
    fun findByMAC(MAC: String): StudentEntity?
}