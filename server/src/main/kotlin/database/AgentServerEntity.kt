package database

import javax.persistence.*

@Entity
@Table(name = "AgentServer", schema = "dbo", catalog = "DBPocket")
open class AgentServerEntity {
    @get:Basic
    @get:Column(name = "SvrID", nullable = false)
    var svrID: Short? = null
    @get:Basic
    @get:Column(name = "SvrCode", nullable = false)
    var svrCode: String? = null
    @get:Basic
    @get:Column(name = "Version", nullable = false)
    var version: String? = null
    @Id
    @get:Basic
    @get:Column(name = "SvrKey", nullable = false, columnDefinition = "uniqueidentifier")
    var svrKey: String? = null
    @get:Basic
    @get:Column(name = "RoomID", nullable = false)
    var roomID: Short? = null


    override fun toString(): String =
            "Entity of type: ${javaClass.name} ( " +
                    "svrID = $svrID " +
                    "svrCode = $svrCode " +
                    "version = $version " +
                    "svrKey = $svrKey " +
                    "roomID = $roomID " +
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

        return true
    }

}

