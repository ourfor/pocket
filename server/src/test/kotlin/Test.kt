import tools.Md5
import java.util.*



fun main(vararg args: String) {
    val str = "测试Md5"
    val result = Md5.md5Hex(str,"salt")
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
}