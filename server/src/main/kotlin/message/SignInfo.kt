package message

import com.fasterxml.jackson.annotation.JsonAlias
import com.fasterxml.jackson.annotation.JsonAutoDetect
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonPropertyOrder

/**
 * student sign info
 */
@JsonPropertyOrder("BName","Bdistance","BMac")
data class SignInfo (
        @JsonAlias("BMac")
        @get:JsonProperty("BMac")
        val mac: String,

        @JsonAlias("BName")
        @get:JsonProperty("BName")
        val studId: String?,

        @JsonAlias("Bdistance")
        @get:JsonProperty("Bdistance")
        val distance: String
)

@JsonPropertyOrder("succList","failList")
data class SignResult(
        val succList: ArrayList<Map<String,Any?>>,
        val failList: ArrayList<SignInfo>
)

data class SignRequest(
        @JsonAlias("AppID")
        val appId: Short,
        @JsonAlias("devices")
        val data: List<SignInfo>,
        val md5: String,
        val type: String
)

data class SignResponse(
        val md5: String,
        val data: Any?
)