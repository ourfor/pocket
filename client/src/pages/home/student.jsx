import { useState, useEffect } from 'react'
import axios from 'axios'
import { Empty } from 'antd'
import { Lessons } from './lessons'
import { RecordItem } from '../../components/record/record-item'
import { ButtonTip } from '../../components/tip/tip'
import { RecordList } from '../record/table'
import { Expand } from '../record/appeal'

export default function Student({data, user, todo=[]}) {
    const [content,setContent] = useState(null)
    useEffect(() => {
        axios.get(`${$conf.api.host}/record/time?stuId=${user.id}`)
            .then(({data: {data,code}}) => {
                if(code===200) {
                    deal(data)
                }
            })

        function deal({ lessons, rooms, records }) {
            const lessonMap = {}
            const roomMap = {}
            lessons.forEach(({lessonID,term,lessonName}) => lessonMap[lessonID+term]=lessonName)
            rooms.forEach(({roomID,roomName,building}) => roomMap[roomID] = {roomName,building})
            const { nickname: stuName } = user
            const source = records.map((record) => {
                const {lessonID,term,roomID} = record
                const { building, roomName } = roomMap[roomID]
                const place = `${building}-${roomName}`
                return {...record,lessonName: lessonMap[lessonID+term], place,stuName}
            })

            setContent(<RecordList role="student" dataSource={source} expand={Expand} />)
        }
    },[])
    return (
        <section type="student">
            {/* <ButtonTip type="schedule" text="我选修的课程" theme="#55c51e" />
            <Lessons dataSource={data.lessons} /> */}
            <ButtonTip type="bell" text="正在考勤" theme="#a30000" />
            {/* {
                todo.map(({place,beginTime,endTime,lessonName},i) => 
                    <RecordItem key={`record-${i}`} room={place} time={[beginTime,endTime]} lessonName={lessonName} />
                )
            } */}
            {content ? content : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </section>
    )
}