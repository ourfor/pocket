import com.fasterxml.jackson.databind.ObjectMapper
import tools.Md5
import java.text.SimpleDateFormat
import java.util.*
import java.util.regex.Pattern


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
    val date = Date().time
    println(date)
    val time = System.currentTimeMillis()
    println(time)
    val diff = 68727
    val late = when(diff) {
        in -300_000..300_000  -> 1
        else -> 2
    }
    println(300_000)
    println(late)
    val dateStr = SimpleDateFormat("yyyy-MM-dd").format(Date())
    val datetime = "$dateStr 00:00:00"
    val today = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("$dateStr 00:00:00")
    println(today)
    println(datetime)


    val regex = "[0-9A-Fa-f]{12}"
    val pattern = Pattern.compile(regex)
    val matcher = pattern.matcher("AB12da0723oc")
    println(matcher.matches())
    mark()
}

fun verify(data: Any?,salt: String,md5: String): Boolean = when(data) {
    null -> false
    Md5.md5Hex(ObjectMapper().writeValueAsString(data), salt) == md5 -> true
    else -> false
}

fun mark() {
    val str = "daf98543-c487-af6c-eb23-0cae002c92fd"
    val regex = "(\\w{8})-(\\w{4})-(\\w{4})-(\\w{4})-(\\w{12})"
    val pattern = Pattern.compile(regex)
    val matcher = pattern.matcher(str)
    println(matcher.matches())
    val result = str.replace(regex,"$1-****-****-****-$5")
    println(result)
    println(str)
}
