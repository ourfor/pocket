package tools

fun format(data: String): String {
    val buffer = StringBuffer(data)
    buffer.insert(8,'-')
            .insert(13,"-")
            .insert(18,'-')
            .insert(23,'-').toString()
    return buffer.toString()
}

fun format(data: StringBuffer): String {
    data.insert(8,'-')
            .insert(13,"-")
            .insert(18,'-')
            .insert(23,'-').toString()
    return data.toString()
}