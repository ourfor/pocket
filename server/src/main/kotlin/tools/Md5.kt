package tools

import com.fasterxml.jackson.databind.ObjectMapper
import java.io.UnsupportedEncodingException
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

object Md5 {
    @JvmStatic
    private val objMap = ObjectMapper()

    @JvmStatic
    private fun hex(array: ByteArray): String = hexBuff(array).toString()

    @JvmStatic
    fun md5Hex(message: String, salt: String?): String? = md5HexBuff(message,salt).toString()

    @JvmStatic
    fun md5HexObj(message: Any, salt: String?): String? = md5HexBuff(objMap.writeValueAsString(message), salt).toString()

    @JvmStatic
    private fun hexBuff(array: ByteArray): StringBuffer {
        val buffer = StringBuffer()
        for (i in array.indices) {
            buffer.append(Integer.toHexString((array[i].toInt()
                    and 0xFF) or 0x100).substring(1, 3))
        }
        return buffer
    }

    @JvmStatic
    fun md5HexBuff(message: String, salt: String?): StringBuffer? {
        return try {
            val md = MessageDigest.getInstance("MD5")
            if(salt==null) hexBuff(md.digest(message.toByteArray(charset("UTF-8"))))
            else hexBuff(md.digest((message+salt).toByteArray(charset("UTF-8"))))
        } catch (e: NoSuchAlgorithmException) {
            null
        } catch (e: UnsupportedEncodingException) {
            null
        }
    }

    @JvmStatic
    fun verify(data: Any?,salt: String,md5: String): Boolean = when(data) {
        null -> false
        else -> md5Hex(objMap.writeValueAsString(data),salt) == md5
    }

    @JvmStatic
    fun verify(data: String,md5: String): Boolean = (md5==md5Hex(data,null))

}