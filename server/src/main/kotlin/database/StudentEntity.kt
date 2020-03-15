package database

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "Student", schema = "dbo", catalog = "dbPocketTest")
open class StudentEntity() {
    @get:Id
    @get:Column(name = "StuID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(15)")
    var stuID: String? = null
    @get:Basic
    @get:Column(name = "StuName", nullable = false, columnDefinition = "nvarchar(30)")
    var stuName: String? = null
    @get:Basic
    @get:Column(name = "ClassID", nullable = false, columnDefinition = "smallint")
    var classID: Short? = null
    @get:Basic
    @get:Column(name = "Sex", nullable = false, columnDefinition = "bit")
    var sex: Boolean? = null
    @get:Basic
    @get:Column(name = "PasswdHash", nullable = true, columnDefinition = "uniqueidentifier")
    var passwdHash: String? = null
    @get:Basic
    @get:Column(name = "MAC", nullable = false, columnDefinition = "char(12)")
    var MAC: String? = null
    @get:Basic
    @get:Column(name = "SiteNo", nullable = false, columnDefinition = "tinyint")
    var siteNo: Byte? = null

    @JsonIgnore
    @get:OneToMany(mappedBy = "refStudentEntity")
    var refAttendRecEntities: List<AttendRecEntity>? = null
    @JsonIgnore
    @get:OneToMany(mappedBy = "refStudentEntity")
    var refSelectLessonEntities: List<SelectLessonEntity>? = null

    constructor(stuID: String?, stuName: String?, classID: Short?, sex: Boolean?, passwdHash: String?, MAC: String?, siteNo: Byte?) : this() {
        this.stuID = stuID
        this.stuName = stuName
        this.classID = classID
        this.sex = sex?:true
        this.passwdHash = passwdHash
        this.MAC = MAC?:"unknown"
        this.siteNo = siteNo
    }

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

