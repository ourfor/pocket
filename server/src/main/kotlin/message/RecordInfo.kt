package message

class RecordInfo {

}

data class RecordRequest (
        val time: List<String>,
        val lesson: Lesson,
        val room: Short
)

data class Lesson (
        val id: String,
        val term: String
)

