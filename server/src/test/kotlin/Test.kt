import tools.Md5

fun main(vararg args: String) {
    val str = "测试Md5"
    val result = Md5.md5Hex(str)
    println(result)
}