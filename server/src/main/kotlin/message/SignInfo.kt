package message

import com.fasterxml.jackson.annotation.JsonAlias

/**
 * student sign info
 */
data class SignInfo(
        @JsonAlias("BMac")
        val mac: String,
        @JsonAlias("BName")
        val studId: String?,
        @JsonAlias("Bdistance")
        val distance: String
)

data class SignResult(
        val succList: ArrayList<Map<String,Any?>>,
        val failList: ArrayList<SignInfo>
)

data class SignRequest(
        @JsonAlias("AppID")
        val appId: String,
        @JsonAlias("devices")
        val data: List<SignInfo>,
        val md5: String,
        val type: String
)