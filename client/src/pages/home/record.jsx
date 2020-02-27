import { useState, useEffect } from 'react'
import { Button, Icon, message, Empty } from 'antd'
import axios from 'axios'
import { RecordForm } from '../../components/record/record'

export function Record({dataLimit: {lessons,rooms},userId,dispatch,todo=[]}) {
    const [record,setRecord] = useState(todo)
    const [buff,setBuff] = useState(null)
    const [rm,setRm] = useState(null)

    const newRec = (e) => {
        const map = {}
        rooms.forEach(({roomID}) => (map[roomID]=false))
        setBuff(<RecordForm key={Date.now()} lessons={lessons} roomMap={map} 
            rooms={rooms} add={clean} clean={() => setBuff(null)} />)
    }

    useEffect(() => {
        let result = null
        axios.get(`${$conf.api.host}/record/todo?teachId=${userId}`)
            .then(({data: {data,code}}) => {
                if(code===200) {
                    const options = []
                    const now = Date.now()
                    data.map(({lesson,beginTime,endTime,room},i) => {
                        const time = [beginTime,endTime]
                        options.push({
                            key: `record-item-${now}-${i}`,
                            disabled: true,
                            date: time,
                            lessons: [lesson],
                            rooms: [room],
                            destory: () => remove(`record-item-${now}-${i}`)
                        })
                    })
                    setRecord(() => options)
                    result = data
                }
        })
        return () => {
            dispatch({type: 'todo', todo: result })
        }
    },[])

    const clean = ({lesson,room,date}) => {
        const _lesson = [lessons[lesson]]
        const _room = rooms.filter(({roomID}) => roomID === room)
        const position = record.length
        const now = Date.now()
        const ele = {
            key: `record-item-${now}`,
            disabled: true,
            date,
            lessons: _lesson,
            rooms: _room,
            destory: () => remove(`record-item-${now}`)
        }
        const list = [...record,ele]
        setRecord(() => list)
        setBuff(null)
    }

    useEffect(() => {
        if(rm) {
            setRecord(
                record.filter(
                    ({key}) => key!==rm
                )
            )
        }
    },[rm])

    const remove = (key) => {
        setRm(key)
    }

    return (
        <div className="create-lesson-record">
            <div>
                <Button type="primary" style={{backgroundColor: '#55c51e',borderColor: '#55c51e'}}>
                    <Icon type="sound" /> 我今天的上课记录
                </Button>
                { 
                    record.length ===0? 
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                    record.map((v,i) => <RecordForm {...v} />)
                }
            </div>
            <div>
                <Button type="primary" onClick={newRec}>
                    <Icon type="plus-circle" /> 新建考勤记录
                </Button>
                { buff }
            </div>
        </div>
    )
}
