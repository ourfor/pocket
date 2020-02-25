import axios from 'axios'
import { useState, useEffect } from 'react'
import { Cascader, Button, Icon, Empty } from 'antd'
import { Container } from './style'
import { RecordList } from './table'
import { connect } from '../../store/connect'
import { GoBack } from '../../components/menu-bar/menu-bar'
import { Expand } from './appeal'

export function PageRecord({global}) {
    const [options,setOptions] = useState([])
    const [param,setParam] = useState([])
    const [data,setData] = useState(null)

    const search = () => {
        const query = param.join('')
        load(query)
    }

    const load = (query) => {
        axios.get(`${$conf.api.host}/record/search?${query}`)
            .then(({data: {data,code}}) => {
                if(code === 200) {
                    const { records, students } = data
                    const result = records.map((record) => 
                    ({...record, stuName: students[record.stuID]}))
                    setData(<RecordList dataSource={result} />)
                }
            })        
    }

    useEffect(() => {
        const query = location.search
        if(/lessonId=.*&term=.*&beginTime=.*/.test(query)) {
            load(query.substr(1))
        }

        const role = global.data.role==="student"?'stuId':'teachId'
        axios.get(`${$conf.api.host}/record/time?${role}=${global.data.user}`)
            .then(({data: {data,code}}) => {
                if(code===200) {
                    const deal = global.data.role==="student"?student:teacher
                    deal(data)
                }
            })

        function teacher(data) {
            const options = data.map(({lesson,time_range}) => {
                const { lessonID, term, lessonName } = lesson
                return {
                    value: `lessonId=${lessonID}&term=${term}`,
                    label: `${lessonID} - ${lessonName}`,
                    children: time_range.map(v => ({value: `&beginTime=${v}`, label: v}))
                }
            })
            setOptions(options)
        }

        function student({ lessons, rooms, records }) {
            const lessonMap = {}
            const roomMap = {}
            lessons.forEach(({lessonID,term,lessonName}) => lessonMap[lessonID+term]=lessonName)
            rooms.forEach(({roomID,roomName,building}) => roomMap[roomID] = {roomName,building})
            const { nickname: stuName } = global.data
            const source = records.map((record) => {
                const {lessonID,term,roomID} = record
                const { building, roomName } = roomMap[roomID]
                const place = `${building}-${roomName}`
                return {...record,lessonName: lessonMap[lessonID+term], place,stuName}
            })

            setData(<RecordList bordered role="student" dataSource={source} expand={Expand} />)
        }
    },[])

    return (
        <Container>
            <div className="header-bar">
                <GoBack /> 
                <h3> 历史考勤记录📝</h3>
                <Cascader className="select-record" options={options} onChange={setParam} placeholder="Please select" />
                <Button type="primary" className="search-record" onClick={search}><Icon type="search" /> 查询考勤</Button>
            </div>
            <div className="content-wrap" role={global.data.role}>
                <div className="content" role={global.data.role}>
                    {data ? data : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </div>
            </div>
        </Container>
    )
}

export default connect(PageRecord)
