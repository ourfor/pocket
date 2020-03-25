package database

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "AgentServer", schema = "dbo", catalog = "dbPocketTest")
open class AgentServerEntity() {
    @get:Id
    @get:Column(name = "SvrID", nullable = false, insertable = false, updatable = false, columnDefinition = "smallint")
    var svrID: Short? = null
    @get:Basic
    @get:Column(name = "SvrCode", nullable = true, columnDefinition = "char(16)")
    var svrCode: String? = null
    @get:Basic
    @get:Column(name = "Version", nullable = false, columnDefinition = "varchar(20)")
    var version: String? = null
    @get:Basic
    @get:Column(name = "SvrKey", nullable = true, columnDefinition = "uniqueidentifier")
    var svrKey: String? = null
    @get:Basic
    @get:Column(name = "RoomID", nullable = false, insertable = false, updatable = false, columnDefinition = "smallint")
    var roomID: Short? = null
    @get:Basic
    @get:Column(name = "Exception", nullable = false, columnDefinition = "bit")
    var exception: Boolean? = null
    @get:Basic
    @get:Column(name = "Online", nullable = false, columnDefinition = "bit")
    var online: Boolean? = null
    @get:Basic
    @get:Column(name = "State", nullable = true, columnDefinition = "nchar(2)")
    var state: String? = null

    @JsonIgnore
    @get:ManyToOne(fetch = FetchType.LAZY)
    @get:JoinColumn(name = "RoomID", referencedColumnName = "RoomID")
    var refRoomEntity: RoomEntity? = null
    @JsonIgnore
    @get:OneToMany(mappedBy = "refAgentServerEntity")
    var refAttendRecEntities: List<AttendRecEntity>? = null

    constructor(svrID: Short?, svrCode: String?, version: String?, svrKey: String?, roomID: Short?, exception: Boolean, online: Boolean, state: String? = null) : this() {
        this.svrID = svrID
        this.svrCode = svrCode
        this.version = version
        this.svrKey = svrKey
        this.roomID = roomID
        this.exception = exception
        this.online = online
        this.state = state
        this.refRoomEntity = RoomEntity()
        refRoomEntity!!.roomID = roomID
    }


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "svrID = $svrID " +
                    "svrCode = $svrCode " +
                    "version = $version " +
                    "svrKey = $svrKey " +
                    "roomID = $roomID " +
                    "exception = $exception " +
                    "online = $online " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as AgentServerEntity

        if (svrID != other.svrID) return false
        if (svrCode != other.svrCode) return false
        if (version != other.version) return false
        if (svrKey != other.svrKey) return false
        if (roomID != other.roomID) return false
        if (exception != other.exception) return false
        if (online != other.online) return false
        if (state != other.state) return false

        return true
    }

}

