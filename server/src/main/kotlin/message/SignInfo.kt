package message

import com.fasterxml.jackson.annotation.JsonAlias
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonPropertyOrder
import java.sql.Timestamp

/**
 * student sign info
 */
@JsonPropertyOrder("BName","Bdistance","BMac")
data class SignInfo (
    @get:JsonAlias("BMac")
    @get:JsonProperty("BMac")
    val mac: String,

    @get:JsonAlias("BName")
    @get:JsonProperty("BName")
    val studId: String?,

    @get:JsonAlias("Bdistance")
    @get:JsonProperty("Bdistance")
    val distance: String
)


@JsonPropertyOrder("succList","failList")
data class SignResult(
        val succList: ArrayList<Map<String,Any?>>,
        val failList: ArrayList<SignInfo>
)

data class SignRequest (
    @get:JsonAlias("data")
    val data: SignData,
    val md5: String
)

@JsonPropertyOrder("AppID","time","devices","type")
data class SignData (
    @get:JsonAlias("AppID")
    @get:JsonProperty("AppID")
    val appId: Short,
    /* request timestamp*/
    val time: Long,
    @get:JsonAlias("devices")
    @get:JsonProperty("devices")
    val data: List<SignInfo>,

    val type: String
)

data class SignResponse(
        val md5: String,
        val data: Any?
)

