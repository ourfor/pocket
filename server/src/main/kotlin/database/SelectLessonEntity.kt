package database

import javax.persistence.*

@Entity
@Table(name = "SelectLesson", schema = "dbo", catalog = "DBPocket")
open class SelectLessonEntity {
    @Id
    @get:Basic
    @get:Column(name = "StuID", nullable = false)
    var stuID: String? = null
    @get:Basic
    @get:Column(name = "LessonID", nullable = false)
    var lessonID: String? = null
    @get:Basic
    @get:Column(name = "Term", nullable = false)
    var term: String? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "stuID = $stuID " +
                    "lessonID = $lessonID " +
                    "term = $term " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as SelectLessonEntity

        if (stuID != other.stuID) return false
        if (lessonID != other.lessonID) return false
        if (term != other.term) return false

        return true
    }

}

