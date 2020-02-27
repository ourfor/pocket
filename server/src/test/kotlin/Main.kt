object Main {
    @JvmStatic
    fun main(args: Array<String>) {
        val str = "daf98543-c487-af6c-eb23-0cae002c92fd"
        val result = str.replace("(\\w{8})-(\\w{4})-(\\w{4})-(\\w{4})-(\\w{12})".toRegex(), "$1-****-****-****-$5")
        println(result)
    }
}