import { useState, useEffect } from 'react'
import { Button, Icon, Select , message, Empty, TimePicker } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { RecordItem } from './record-item'
import { Tip } from '../tip/tip'
import { FormItem } from '../form/form'

const dateFormat = 'YYYY-MM-DD HH:mm'
const timeFormat = 'HH:mm:ss'

const { Option } = Select

export function RecordForm({lessons,rooms,roomMap={},date,add,destory,clean,disabled=false}) {
    const history = useHistory()
    const [begin,end] = date?date:['','']
    const [lesson,setLesson] = useState(0)
    const [room,setRoom] = useState(rooms[0].roomID)
    const [load,setLoad] = useState(false)
    const [deleteLoad,setDeleteLoad] = useState(false)
    const [usable,setUsable] = useState(roomMap)
    const [roomLoad,setRoomLoad] = useState(true)
    const [cleanup,setCleanup] = useState(false)
    const origin = date

    useEffect(() => {
        if(!disabled && !cleanup){
            const { beginTime, endTime } = lessons[lesson]
            setCleanup(true)
            find_usable_room(beginTime,endTime)
        }
    },[])

    const find_usable_room = (start,end) => {
        setRoomLoad(true)
        if(typeof start === "string") {
            const dateStr = now.toLocaleDateString().replace(/\//g,'-')
            start = dateStr + " " + start.split(" ")[1]
            end = dateStr + " " + end.split(" ")[1]
        } else {
            const time = [...start]
            start = time[0]
            end = time[1]
        }

        axios.get(`${$conf.api.host}/rooms/usable?start=${start}&end=${end}`)
        .then(({data: {data,code}}) => {
            if(code===200) {
                const map = {}
                data.forEach(({roomID}) => (map[roomID]=true))
                setUsable(state => ({...roomMap,...map}))
                setRoomLoad(false)
            }
        })
    }
    
    const now = new Date()
    const dateStr = now.toLocaleDateString().replace(/\//g,'-')
    const {beginTime,endTime} = lessons[lesson]
    if(date) {
        date=[moment(date[0].split(" ")[1], timeFormat), 
              moment(date[1].split(" ")[1], timeFormat)]
    } else {
        date=[moment(beginTime.split(' ')[1],timeFormat),
              moment(endTime.split(' ')[1],timeFormat)]
    }

    const [timeRange,setTimeRange] = useState(date)
    const [time,setTime] = useState([
        dateStr + " " + beginTime.split(' ')[1],
        dateStr + " " + endTime.split(' ')[1]
    ])

    const submit = () => {
        setLoad(true)
        let pass = false
        const {lessonID: id, term} = lessons[lesson]
        const record = {
            time,
            lesson: { id, term },
            room,
        }

        if(time.length < 2) {
            message.error('请输入正确的时间 😊')
        } else if(new Date(time[0]) > new Date(time[1])) {
            message.error('看起来时间顺序反了, 开始时间晚于结束时间 😳')
        } else if(new Date(time[0]) < Date.now()) {
            message.error('没办法为过去的时间创建考勤记录 😂')
        } else if(!usable[room]) {
            message.warning('该教室不可用, 请选择其他教室 😅')
        } else {
            pass = true
        }

        if(!pass) {
            setLoad(false)
            return 
        }
        axios.post(`${$conf.api.host}/record`,record)
            .then(({data: {code,data}}) => {
                if(code===200) {
                    message.success(data)
                    setLoad(false)
                    add({lesson,room,date: time})
                }
            })
        
    }

    const remove = () => {
        if(!disabled) {
            clean()
            return 
        }
        
        setDeleteLoad(true)
        const { lessonID,term } = lessons[0]
        const query = `lessonId=${lessonID}&term=${term}&room=${room}&beginTime=${origin[0]}&endTime=${origin[1]}`
        axios.delete(`${$conf.api.host}/record?${query}`)
            .then(({data: {code,msg}}) => {
                if(code===200) {
                    message.success(`${msg}, 请刷新页面`)
                } else {
                    message.error(`记录📝删除失败,${msg}`)
                }
                destory()
                setDeleteLoad(false)
            })
    }

    const view = () => {
        const { lessonID, term } = lessons[0]
        const query = `lessonId=${lessonID}&term=${term}&beginTime=${begin}`
        history.push(`/record?${query}`)
    }

    const selectTime = (index,value,timeStr) => {
        const tmp = time 
        tmp[index] = dateStr + " " + timeStr
        setTime(tmp)
        find_usable_room(time)
    }

    const changeLesson = (lesson) => {
        setLesson(lesson)
        const {beginTime,endTime} = lessons[lesson]
        find_usable_room(beginTime,endTime)
        setTimeRange([moment(beginTime.split(' ')[1],timeFormat),
              moment(endTime.split(' ')[1],timeFormat)])
    }

    return (
        <div className="record-form" style={{padding: '10px 0'}}>
            <FormItem>
            <Tip color="green"><Icon type="book" /> 课程</Tip>
            <Select disabled={disabled} defaultValue={lesson} style={{ width: 120 }} onChange={changeLesson}>
            { 
                lessons.map(({lessonName,lessonID},key) => 
                    <Option key={`lesson-${key}`} value={key}>{lessonName}</Option>
                ) 
            }
            </Select>
            </FormItem>
            <FormItem>
            <Tip color="blue"><Icon type="home" /> 教室</Tip>
            <Select loading={!disabled && roomLoad } disabled={disabled} defaultValue={room} style={{ width: 194 }} onChange={setRoom}>
            {
                rooms.map(({roomID,roomName,siteCount,building}) => {
                    const selectable = !usable[roomID]
                    return <Option className={selectable?'busy':'free'} disabled={selectable} value={roomID} 
                        key={`room-${roomID}-${selectable}`}>{`${building} ${roomName} 座位: ${siteCount}`}</Option>
                })
                    
            }
            </Select>
            </FormItem>
            <FormItem>
                <Tip><Icon type="clock-circle" theme="filled" /> 课程时间</Tip>
                <TimePicker key={`${lesson}-start-time`} 
                    onChange={(time,timeStr) => selectTime(0,time,timeStr)}
                    disabled={disabled} defaultValue={timeRange[0]} />
                    &nbsp;~&nbsp; 
                <TimePicker key={`${lesson}-end-time`}
                    onChange={(time,timeStr) => selectTime(1,time,timeStr)} 
                    disabled={disabled} defaultValue={timeRange[1]} />
            </FormItem>
            <Button className="ic-add" style={{color: 'green'}} onClick={disabled?view:submit} loading={load}>
                <Icon type={disabled?'eye':'check-circle'} theme="filled" 
                    style={{display: load?'none':'unset'}} />{disabled?'查看':'确认'}
            </Button>
            {
                date && new Date(date[0]) > Date.now() ?
                <Button className="ic-remove" style={{color: 'red'}} onClick={remove} loading={deleteLoad}>
                    <Icon type='delete' theme="filled" 
                        style={{display: deleteLoad?'none':'unset'}} /> 删除
                </Button> : null
            }
        </div>
    )
}