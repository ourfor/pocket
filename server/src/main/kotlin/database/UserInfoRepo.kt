package database

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.persistence.Cacheable
import javax.transaction.Transactional

@Repository
@Transactional
@Cacheable
interface UserInfoRepo : CrudRepository<UserInfoEntity,Short> {
    fun findByUserName(userName: String): UserInfoEntity?
    fun findFirstByOrderByUserIDDesc(): UserInfoEntity?
    fun findByUserID(id: Short): UserInfoEntity?
}