package database

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "Teacher", schema = "dbo", catalog = "dbPocketTest")
open class TeacherEntity {
    @get:Id
    @get:Column(name = "TeachID", nullable = false, insertable = false, updatable = false, columnDefinition = "smallint")
    var teachID: Short? = null
    @get:Basic
    @get:Column(name = "TeachName", nullable = false, columnDefinition = "nvarchar(30)")
    var teachName: String? = null
    @get:Basic
    @get:Column(name = "PasswdHash", nullable = true, columnDefinition = "uniqueidentifier")
    var passwdHash: String? = null
    @get:Basic
    @get:Column(name = "Sex", nullable = true, columnDefinition = "bit")
    var sex: Boolean? = null

    @JsonIgnore
    @get:OneToMany(mappedBy = "refTeacherEntity")
    var refLessonEntities: List<LessonEntity>? = null

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

