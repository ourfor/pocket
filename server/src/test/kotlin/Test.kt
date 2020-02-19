import com.fasterxml.jackson.databind.ObjectMapper
import tools.Md5
import java.util.*


fun main(vararg args: String) {
    val str = "devel"
    val result = Md5.md5Hex(str,"devel")
    println(result)
    val temp = "2323107348"
    println(UUID.randomUUID())
    val array = ArrayList<Int>()
    array.addAll(listOf(1,3,4,5))
    println(array.last())
    var id = array.last()
    println(++id)
    array.addAll(listOf(1,581,2))
    println(array.last())
    var id2 = array.last()
    println(++id2)
    val equal = Md5.md5Hex("adminmaster",null)
    println(equal)
}

fun verify(data: Any?,salt: String,md5: String): Boolean = when(data) {
    null -> false
    Md5.md5Hex(ObjectMapper().writeValueAsString(data), salt) == md5 -> true
    else -> false
}