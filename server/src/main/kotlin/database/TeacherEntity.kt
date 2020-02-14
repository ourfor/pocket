package database

import javax.persistence.*

@Entity
@Table(name = "Teacher", schema = "dbo", catalog = "DBPocket")
open class TeacherEntity {
    @Id
    @get:Basic
    @get:Column(name = "TeachID", nullable = false)
    var teachID: Short? = null
    @get:Basic
    @get:Column(name = "TeachName", nullable = false)
    var teachName: String? = null
    @get:Basic
    @get:Column(name = "PasswdHash", nullable = false, columnDefinition = "uniqueidentifier")
    var passwdHash: String? = null
    @get:Basic
    @get:Column(name = "Sex", nullable = false)
    var sex: java.lang.Boolean? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "teachID = $teachID " +
                    "teachName = $teachName " +
                    "passwdHash = $passwdHash " +
                    "sex = $sex " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as TeacherEntity

        if (teachID != other.teachID) return false
        if (teachName != other.teachName) return false
        if (passwdHash != other.passwdHash) return false
        if (sex != other.sex) return false

        return true
    }

}

