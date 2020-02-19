package message

import com.fasterxml.jackson.annotation.JsonPropertyOrder

data class AuthRequest(
        val data: AuthData,
        val md5: String
)

@JsonPropertyOrder("username","password","type")
data class AuthData (
        val username: String,
        val password: String,
        val type: String
)