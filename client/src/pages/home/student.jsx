import { Lessons } from './lessons'
import { RecordItem } from './record'
import { ButtonTip } from '../../components/tip/tip'
export default function Student({data, user}) {
    log(data)
    return (
        <section type="student">
            <ButtonTip type="schedule" text="我选修的课程" theme="#55c51e" />
            <Lessons dataSource={data.lessons} />
            <ButtonTip type="bell" text="正在考勤" theme="#a30000" />
            {
                data.todo.map(({place,beginTime,endTime,lessonName},i) => 
                    <RecordItem key={`record-${i}`} room={place} time={[beginTime,endTime]} lessonName={lessonName} />
                )
            }
        </section>
    )
}