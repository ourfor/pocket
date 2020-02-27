package message

import com.fasterxml.jackson.annotation.JsonPropertyOrder

data class AdminAuthRequest (
    val data: AdminAuthData,
    val md5: String
)

@JsonPropertyOrder("username","passwd")
data class AdminAuthData (
    val username: Short,
    val passwd: String
)