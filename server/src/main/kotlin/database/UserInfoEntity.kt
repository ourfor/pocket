package database

import javax.persistence.*

@Entity
@Table(name = "UserInfo", schema = "dbo", catalog = "dbPocketTest")
open class UserInfoEntity {
    @get:Id
    @get:Column(name = "UserID", nullable = false, columnDefinition = "smallint")
    var userID: Short? = null
    @get:Basic
    @get:Column(name = "UserName", nullable = false, columnDefinition = "varchar(20)")
    var userName: String? = null
    @get:Basic
    @get:Column(name = "PasswdHash", nullable = false, columnDefinition = "uniqueidentifier")
    var passwdHash: String? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "userID = $userID " +
                    "userName = $userName " +
                    "passwdHash = $passwdHash " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as UserInfoEntity

        if (userID != other.userID) return false
        if (userName != other.userName) return false
        if (passwdHash != other.passwdHash) return false

        return true
    }

}

