package database

import javax.persistence.*

@Entity
@Table(name = "AttendRec", schema = "dbo", catalog = "DBPocket")
open class AttendRecEntity {
    @Id
    @get:Basic
    @get:Column(name = "StuID", nullable = false)
    var stuID: String? = null
    @get:Basic
    @get:Column(name = "SvrID", nullable = false)
    var svrID: Byte? = null
    @get:Basic
    @get:Column(name = "SiteNo", nullable = false)
    var siteNo: String? = null
    @get:Basic
    @get:Column(name = "RoomID", nullable = false)
    var roomID: Int? = null
    @get:Basic
    @get:Column(name = "LessonID", nullable = false)
    var lessonID: Int? = null
    @get:Basic
    @get:Column(name = "MAC", nullable = false)
    var MAC: String? = null
    @get:Basic
    @get:Column(name = "BeginTime", nullable = false)
    var beginTime: java.sql.Date? = null
    @get:Basic
    @get:Column(name = "EndTime", nullable = false)
    var endTime: java.sql.Date? = null
    @get:Basic
    @get:Column(name = "AttendTag", nullable = false)
    var attendTag: Byte? = null
    @get:Basic
    @get:Column(name = "LeaveEarly", nullable = true)
    var leaveEarly: Boolean? = null
    @get:Basic
    @get:Column(name = "RefreshTime", nullable = false)
    var refreshTime: java.sql.Date? = null
    @get:Basic
    @get:Column(name = "PhoneIn", nullable = false)
    var phoneIn: Boolean? = null
    @get:Basic
    @get:Column(name = "IsOver", nullable = false)
    var isOver: Boolean? = null
    @get:Basic
    @get:Column(name = "BTException", nullable = true)
    var BTException: Boolean? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "stuID = $stuID " +
                    "svrID = $svrID " +
                    "siteNo = $siteNo " +
                    "roomID = $roomID " +
                    "lessonID = $lessonID " +
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

        if (stuID != other.stuID) return false
        if (svrID != other.svrID) return false
        if (siteNo != other.siteNo) return false
        if (roomID != other.roomID) return false
        if (lessonID != other.lessonID) return false
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

