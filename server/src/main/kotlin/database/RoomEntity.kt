package database

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "Room", schema = "dbo", catalog = "dbPocketTest")
open class RoomEntity() {
    @get:Id
    @get:Column(name = "RoomID", nullable = false, insertable = false, updatable = false, columnDefinition = "smallint")
    var roomID: Short? = null
    @get:Basic
    @get:Column(name = "RoomName", nullable = false, columnDefinition = "nvarchar(50)")
    var roomName: String? = null
    @get:Basic
    @get:Column(name = "SiteCount", nullable = false, columnDefinition = "smallint")
    var siteCount: Short? = null
    @get:Basic
    @get:Column(name = "Building", nullable = false, columnDefinition = "nvarchar(50)")
    var building: String? = null

    @JsonIgnore
    @get:OneToMany(mappedBy = "refRoomEntity")
    var refAgentServerEntities: List<AgentServerEntity>? = null
    @JsonIgnore
    @get:OneToMany(mappedBy = "refRoomEntity")
    var refAttendRecEntities: List<AttendRecEntity>? = null

    constructor(roomID: Short?, roomName: String?, siteCount: Short?, building: String?) : this() {
        this.roomID = roomID
        this.roomName = roomName
        this.siteCount = siteCount
        this.building = building
    }


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "roomID = $roomID " +
                    "roomName = $roomName " +
                    "siteCount = $siteCount " +
                    "building = $building " +
                    ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as RoomEntity

        if (roomID != other.roomID) return false
        if (roomName != other.roomName) return false
        if (siteCount != other.siteCount) return false
        if (building != other.building) return false

        return true
    }

}

