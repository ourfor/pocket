package database

import com.fasterxml.jackson.annotation.JsonIgnore
import java.sql.Timestamp
import javax.persistence.*

@Entity
@Table(name = "AttendRec", schema = "dbo", catalog = "dbPocketTest")
open class AttendRecEntity() {
    @get:Id
    @get:GeneratedValue(strategy=GenerationType.IDENTITY)
    @get:Column(name = "RecID", nullable = false, insertable = false, columnDefinition = "bigint")
    var recID: Long? = null
    @get:Basic
    @get:Column(name = "CreateTime", nullable = true, columnDefinition = "smalldatetime")
    var createTime: Timestamp? = null
    @get:Basic
    @get:Column(name = "StuID", nullable = true, insertable = false, updatable = false, columnDefinition = "varchar(15)")
    var stuID: String? = null
    @get:Basic
    @get:Column(name = "SvrID", nullable = true, insertable = false, updatable = false, columnDefinition = "smallint")
    var svrID: Short? = null
    @get:Basic
    @get:Column(name = "SiteNo", nullable = false, columnDefinition = "varchar(5)")
    var siteNo: String? = null
    @get:Basic
    @get:Column(name = "RoomID", nullable = true, insertable = false, updatable = false, columnDefinition = "smallint")
    var roomID: Short? = null
    @get:Basic
    @get:Column(name = "LessonID", nullable = false, insertable = false, updatable = false, columnDefinition = "varchar(20)")
    var lessonID: String? = null
    @get:Basic
    @get:Column(name = "Term", nullable = false, insertable = false, updatable = false, columnDefinition = "char(6)")
    var term: String? = null
    @get:Basic
    @get:Column(name = "MAC", nullable = false, columnDefinition = "char(12)")
    var MAC: String? = null
    @get:Basic
    @get:Column(name = "BeginTime", nullable = false, columnDefinition = "smalldatetime")
    var beginTime: Timestamp? = null
    @get:Basic
    @get:Column(name = "EndTime", nullable = false, columnDefinition = "smalldatetime")
    var endTime: Timestamp? = null
    @get:Basic
    @get:Column(name = "AttendTag", nullable = false, columnDefinition = "tinyint")
    var attendTag: Byte? = null
    @get:Basic
    @get:Column(name = "LeaveEarly", nullable = true, columnDefinition = "bit")
    var leaveEarly: Boolean? = null
    @get:Basic
    @get:Column(name = "RefreshTime", nullable = false, columnDefinition = "smalldatetime")
    var refreshTime: Timestamp? = null
    @get:Basic
    @get:Column(name = "PhoneIn", nullable = false, columnDefinition = "bit")
    var phoneIn: Boolean? = null
    @get:Basic
    @get:Column(name = "IsOver", nullable = false, columnDefinition = "bit")
    var isOver: Boolean? = null
    @get:Basic
    @get:Column(name = "BTException", nullable = true, columnDefinition = "bit")
    var BTException: Boolean? = null

    @JsonIgnore
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "StuID", referencedColumnName = "StuID")
    var refStudentEntity: StudentEntity? = null
    @JsonIgnore
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "SvrID", referencedColumnName = "SvrID")
    var refAgentServerEntity: AgentServerEntity? = null
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "RoomID", referencedColumnName = "RoomID")
    @JsonIgnore
    var refRoomEntity: RoomEntity? = null
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumns(
            JoinColumn(name = "LessonID", referencedColumnName = "LessonID"),
            JoinColumn(name = "Term", referencedColumnName = "Term")
    )
    var refLessonEntity: LessonEntity? = null

    constructor(createTime: Timestamp?, stuID: String?, svrID: Short?, siteNo: String?, roomID: Short?, lessonID: String?, term: String?, MAC: String?, beginTime: Timestamp?, endTime: Timestamp?, attendTag: Byte?, leaveEarly: Boolean?, refreshTime: Timestamp?, phoneIn: Boolean?, isOver: Boolean?, BTException: Boolean?) : this() {
        this.createTime = createTime
        this.stuID = stuID
        this.svrID = svrID
        this.siteNo = siteNo
        this.roomID = roomID
        this.lessonID = lessonID
        this.term = term
        this.MAC = MAC
        this.beginTime = beginTime
        this.endTime = endTime
        this.attendTag = attendTag
        this.leaveEarly = leaveEarly
        this.refreshTime = refreshTime
        this.phoneIn = phoneIn
        this.isOver = isOver
        this.BTException = BTException

        this.refAgentServerEntity = AgentServerEntity()
        refAgentServerEntity!!.svrID = svrID

        this.refStudentEntity = StudentEntity()
        refStudentEntity!!.stuID = stuID
        refStudentEntity!!.MAC = MAC

        this.refRoomEntity = RoomEntity()
        refRoomEntity!!.roomID = roomID

        this.refLessonEntity = LessonEntity()
        refLessonEntity!!.lessonID = lessonID
        refLessonEntity!!.term = term

    }


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "recID = $recID " +
                    "createTime = $createTime " +
                    "stuID = $stuID " +
                    "svrID = $svrID " +
                    "siteNo = $siteNo " +
                    "roomID = $roomID " +
                    "lessonID = $lessonID " +
                    "term = $term " +
                    "MAC = $MAC " +
                    "beginTime = $beginTime " +
                    "endTime = $endTime " +
                    "attendTag = $attendTag " +
                    "leaveEarly = $leaveEarly " +
                    "refreshTime = $refreshTime " +
                    "phoneIn = $phoneIn " +
                    "isOver = $isOver " +
                    "BTException = $BTException " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as AttendRecEntity

        if (recID != other.recID) return false
        if (createTime != other.createTime) return false
        if (stuID != other.stuID) return false
        if (svrID != other.svrID) return false
        if (siteNo != other.siteNo) return false
        if (roomID != other.roomID) return false
        if (lessonID != other.lessonID) return false
        if (term != other.term) return false
        if (MAC != other.MAC) return false
        if (beginTime != other.beginTime) return false
        if (endTime != other.endTime) return false
        if (attendTag != other.attendTag) return false
        if (leaveEarly != other.leaveEarly) return false
        if (refreshTime != other.refreshTime) return false
        if (phoneIn != other.phoneIn) return false
        if (isOver != other.isOver) return false
        if (BTException != other.BTException) return false

        return true
    }

}

