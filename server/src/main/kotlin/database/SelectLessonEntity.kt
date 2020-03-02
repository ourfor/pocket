package database

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "SelectLesson", schema = "dbo", catalog = "dbPocketTest")
@IdClass(SelectLessonEntityPK::class)
open class SelectLessonEntity() {
    @get:Id
    @get:Column(name = "LessonID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(20)")
    var lessonID: String? = null
    @get:Id
    @get:Column(name = "Term", nullable = false, insertable = false, updatable = false, columnDefinition = "char(6)")
    var term: String? = null
    @get:Id
    @get:Column(name = "StuID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(15)")
    var stuID: String? = null

    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumns(
            JoinColumn(name = "LessonID", referencedColumnName = "LessonID"),
            JoinColumn(name = "Term", referencedColumnName = "Term")
    )
    @JsonIgnore
    var refLessonEntity: LessonEntity? = null
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "StuID", referencedColumnName = "StuID")
    @JsonIgnore
    var refStudentEntity: StudentEntity? = null

    constructor(lessonID: String?, term: String?, stuID: String?) : this() {
        this.lessonID = lessonID
        this.term = term
        this.stuID = stuID
        this.refLessonEntity = LessonEntity()
        this.refLessonEntity!!.lessonID = lessonID
        this.refLessonEntity!!.term = term
        this.refStudentEntity = StudentEntity()
        this.refStudentEntity!!.stuID = stuID
    }

    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "lessonID = $lessonID " +
                    "term = $term " +
                    "stuID = $stuID " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as SelectLessonEntity

        if (lessonID != other.lessonID) return false
        if (term != other.term) return false
        if (stuID != other.stuID) return false

        return true
    }

}

class SelectLessonEntityPK : java.io.Serializable {
    @get:Id
    @get:Column(name = "LessonID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(20)")
    var lessonID: String? = null
    @get:Id
    @get:Column(name = "Term", nullable = false, insertable = false, updatable = false, columnDefinition = "char(6)")
    var term: String? = null
    @get:Id
    @get:Column(name = "StuID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(15)")
    var stuID: String? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as SelectLessonEntityPK

        if (lessonID != other.lessonID) return false
        if (term != other.term) return false
        if (stuID != other.stuID) return false

        return true
    }

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

}
