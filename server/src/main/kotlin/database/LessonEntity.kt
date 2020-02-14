package database

import javax.persistence.*

@Entity
@Table(name = "Lesson", schema = "dbo", catalog = "DBPocket")
open class LessonEntity {
    @Id
    @get:Basic
    @get:Column(name = "LessonID", nullable = false)
    var lessonID: String? = null
    @get:Basic
    @get:Column(name = "LessonName", nullable = false)
    var lessonName: String? = null
    @get:Basic
    @get:Column(name = "WeekDay", nullable = false)
    var weekDay: Byte? = null
    @get:Basic
    @get:Column(name = "Period", nullable = false)
    var period: Byte? = null
    @get:Basic
    @get:Column(name = "TeacherID", nullable = false)
    var teacherID: Short? = null
    @get:Basic
    @get:Column(name = "Term", nullable = false)
    var term: String? = null
    @get:Basic
    @get:Column(name = "BeginTime", nullable = false)
    var beginTime: java.sql.Date? = null
    @get:Basic
    @get:Column(name = "EndTime", nullable = false)
    var endTime: java.sql.Date? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "lessonID = $lessonID " +
                    "lessonName = $lessonName " +
                    "weekDay = $weekDay " +
                    "period = $period " +
                    "teacherID = $teacherID " +
                    "term = $term " +
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
        if (lessonName != other.lessonName) return false
        if (weekDay != other.weekDay) return false
        if (period != other.period) return false
        if (teacherID != other.teacherID) return false
        if (term != other.term) return false
        if (beginTime != other.beginTime) return false
        if (endTime != other.endTime) return false

        return true
    }

}

