package tools

import java.io.UnsupportedEncodingException
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

object Md5 {
    @JvmStatic
    private fun hex(array: ByteArray): String {
        return hexBuff(array).toString()
    }

    private fun hexBuff(array: ByteArray): StringBuffer {
        val buffer = StringBuffer()
        for (i in array.indices) {
            buffer.append(Integer.toHexString((array[i].toInt()
                    and 0xFF) or 0x100).substring(1, 3))
        }
        return buffer
    }

    @JvmStatic
    fun md5Hex(message: String, salt: String): String? = md5HexBuff(message,salt).toString()

    @JvmStatic
    fun md5HexBuff(message: String, salt: String): StringBuffer? {
        return try {
            val md = MessageDigest.getInstance("MD5")
            hexBuff(md.digest((message+salt).toByteArray(charset("UTF-8"))))
        } catch (e: NoSuchAlgorithmException) {
            null
        } catch (e: UnsupportedEncodingException) {
            null
        }
    }
}