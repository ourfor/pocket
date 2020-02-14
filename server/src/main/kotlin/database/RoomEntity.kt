package database

import javax.persistence.*

@Entity
@Table(name = "Room", schema = "dbo", catalog = "DBPocket")
open class RoomEntity {
    @Id
    @get:Basic
    @get:Column(name = "RoomID", nullable = false)
    var roomID: Short? = null
    @get:Basic
    @get:Column(name = "RoomName", nullable = false)
    var roomName: String? = null
    @get:Basic
    @get:Column(name = "SiteCount", nullable = false)
    var siteCount: Short? = null
    @get:Basic
    @get:Column(name = "Building", nullable = false)
    var building: String? = null


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

