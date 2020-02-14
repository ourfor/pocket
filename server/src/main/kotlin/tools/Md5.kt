package tools

import java.io.UnsupportedEncodingException
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

object Md5 {
    @JvmStatic
    private fun hex(array: ByteArray): String {
        val buffer = StringBuffer()
        for (i in array.indices) {
            buffer.append(Integer.toHexString((array[i].toInt()
                    and 0xFF) or 0x100).substring(1, 3))
        }
        return buffer.toString()
    }

    @JvmStatic
    fun md5Hex(message: String): String? {
        return try {
            val md = MessageDigest.getInstance("MD5")
            hex(md.digest(message.toByteArray(charset("UTF-8"))))
        } catch (e: NoSuchAlgorithmException) {
            null
        } catch (e: UnsupportedEncodingException) {
            null
        }
    }
}