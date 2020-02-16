package database

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "Lesson", schema = "dbo", catalog = "dbPocketTest")
@IdClass(LessonEntityPK::class)
open class LessonEntity {
    @get:Id
    @get:Column(name = "LessonID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(20)")
    var lessonID: String? = null
    @get:Id
    @get:Column(name = "Term", nullable = false, insertable = false, updatable = false, columnDefinition = "char(6)")
    var term: String? = null
    @get:Basic
    @get:Column(name = "LessonName", nullable = false, columnDefinition = "nvarchar(50)")
    var lessonName: String? = null
    @get:Basic
    @get:Column(name = "WeekDay", nullable = false, columnDefinition = "tinyint")
    var weekDay: Byte? = null
    @get:Basic
    @get:Column(name = "Period", nullable = false, columnDefinition = "tinyint")
    var period: Byte? = null
    @get:Basic
    @get:Column(name = "TeachID", nullable = true, insertable = false, updatable = false, columnDefinition = "smallint")
    var teachID: Short? = null
    @get:Basic
    @get:Column(name = "BeginTime", nullable = false, columnDefinition = "smalldatetime")
    var beginTime: java.sql.Date? = null
    @get:Basic
    @get:Column(name = "EndTime", nullable = false, columnDefinition = "smalldatetime")
    var endTime: java.sql.Date? = null

    @JsonIgnore
    @get:OneToMany(mappedBy = "refLessonEntity")
    var refAttendRecEntities: List<AttendRecEntity>? = null
    @JsonIgnore
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "TeachID", referencedColumnName = "TeachID")
    var refTeacherEntity: TeacherEntity? = null
    @JsonIgnore
    @get:OneToMany(mappedBy = "refLessonEntity")
    var refSelectLessonEntities: List<SelectLessonEntity>? = null

    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "lessonID = $lessonID " +
                    "term = $term " +
                    "lessonName = $lessonName " +
                    "weekDay = $weekDay " +
                    "period = $period " +
                    "teachID = $teachID " +
                    "beginTime = $beginTime " +
                    "endTime = $endTime " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as LessonEntity

        if (lessonID != other.lessonID) return false
        if (term != other.term) return false
        if (lessonName != other.lessonName) return false
        if (weekDay != other.weekDay) return false
        if (period != other.period) return false
        if (teachID != other.teachID) return false
        if (beginTime != other.beginTime) return false
        if (endTime != other.endTime) return false

        return true
    }

}

class LessonEntityPK : java.io.Serializable {
    @get:Id
    @get:Column(name = "LessonID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(20)")
    var lessonID: String? = null
    @get:Id
    @get:Column(name = "Term", nullable = false, insertable = false, updatable = false, columnDefinition = "char(6)")
    var term: String? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as LessonEntityPK

        if (lessonID != other.lessonID) return false
        if (term != other.term) return false

        return true
    }

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

}
