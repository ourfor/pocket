package database

import javax.persistence.*

@Entity
@Table(name = "Student", schema = "dbo", catalog = "DBPocket")
open class StudentEntity {
    @Id
    @get:Basic
    @get:Column(name = "StuID", nullable = false)
    var stuID: String? = null
    @get:Basic
    @get:Column(name = "StuName", nullable = false)
    var stuName: String? = null
    @get:Basic
    @get:Column(name = "ClassID", nullable = false)
    var classID: Short? = null
    @get:Basic
    @get:Column(name = "Sex", nullable = false)
    var sex: Boolean? = null
    @get:Basic
    @get:Column(name = "PasswdHash", nullable = false, columnDefinition = "uniqueidentifier")
    var passwdHash: String? = null
    @get:Basic
    @get:Column(name = "MAC", nullable = false)
    var MAC: String? = null
    @get:Basic
    @get:Column(name = "SiteNo", nullable = false)
    var siteNo: Byte? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "stuID = $stuID " +
                    "stuName = $stuName " +
                    "classID = $classID " +
                    "sex = $sex " +
                    "passwdHash = $passwdHash " +
                    "MAC = $MAC " +
                    "siteNo = $siteNo " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as StudentEntity

        if (stuID != other.stuID) return false
        if (stuName != other.stuName) return false
        if (classID != other.classID) return false
        if (sex != other.sex) return false
        if (passwdHash != other.passwdHash) return false
        if (MAC != other.MAC) return false
        if (siteNo != other.siteNo) return false

        return true
    }

}

