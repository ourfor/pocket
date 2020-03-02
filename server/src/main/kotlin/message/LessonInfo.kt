package message

import java.sql.Timestamp

data class LessonRequest (
        val lessonId: String,
        val lessonName: String,
        val term: String,
        val period: Short,
        val weekday: Short,
        val datetime: List<Timestamp>,
        val classNo: List<Short>
)
