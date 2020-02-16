package message

/**
 * student sign info
 */
data class SignInfo(
        val MAC: String,
        val studId: String?
)

data class SignResult(
        val succList: ArrayList<Map<String,Any?>>,
        val failList: ArrayList<SignInfo>
)