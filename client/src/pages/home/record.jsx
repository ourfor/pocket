import { useState, useEffect } from 'react'
import { Button, Icon, Select, DatePicker, message, Empty } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const dateFormat = 'YYYY-MM-DD HH:mm'

const { Option } = Select
const { RangePicker } = DatePicker

const FormItem = styled.span`
    padding: 0 5px;
    display: inline-flex;
    align-items: center;
    height: 32px;
`
const Tip = styled.div`
    color: ${props => props.color?props.color:'black'};
    border: 1px dashed #d9d9d9;
    height: 100%;
    line-height: 32px;
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 2px;
`

export function Record({dataLimit: {lessons,rooms},userId}) {
    const [record,setRecord] = useState([])
    const [buff,setBuff] = useState(null)
    const newRec = (e) => {
        setBuff(<RecordForm key={Date.now()} lessons={lessons} 
            rooms={rooms} add={clean}/>)
    }
    useEffect(() => {
        axios.get(`${$conf.api.host}/record/todo?teachId=${userId}`)
            .then(({data: {data,code}}) => {
                if(code===200) {
                    const options = []
                    data.map(({lesson,beginTime,endTime,room}) => {
                        const time = [beginTime.replace(/:00$/,''),endTime.replace(/:00$/,'')]
                        const ele = <RecordForm key={beginTime} disabled={true} 
                            date={time} lessons={[lesson]} rooms={[room]}/>
                        options.push(ele)
                    })
                    setRecord(options)
                }
        })
    },[])

    const clean = ({lesson,room,date}) => {
        const _lesson = [lessons[lesson]]
        const _room = [rooms[room]]
        const ele = <RecordForm key={Date.now()} disabled={true} date={date} lessons={_lesson} rooms={_room}/>
        const list = [...record,ele]
        setRecord(list)
        setBuff(null)
    }
    return (
        <div className="create-lesson-record">
            <div>
                <Button type="primary" style={{backgroundColor: '#55c51e',borderColor: '#55c51e'}}>
                    <Icon type="sound" /> 进行中的考勤记录
                </Button>
                { 
                    record.length ===0? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                                    record.map(v => <div key={`wrap-${v.key}`}>{v}</div>)
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

export function RecordForm({lessons,rooms,date,add,disabled=false}) {
    const history = useHistory()
    const [begin,end] = date?date:['','']
    const [lesson,setLesson] = useState(0)
    const [room,setRoom] = useState(rooms[0].roomID)
    const [time,setTime] = useState([])
    const [load,setLoad] = useState(false)

    const onOk = e => log(e)
    const submit = () => {
        setLoad(true)
        const {lessonID: id, term} = lessons[lesson]
        const record = {
            time,
            lesson: { id, term },
            room,
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
    const view = () => {
        const { lessonID, term } = lessons[0]
        const query = `lessonId=${lessonID}&term=${term}&beginTime=${begin}`
        history.push(`/record?${query}`)
    }

    const selectTime = (value,dataStr) => setTime(dataStr)

    if(date) date=[moment(date[0], dateFormat),moment(date[1], dateFormat)]

    return (
        <div className="record-form" style={{padding: '10px 0'}}>
            <FormItem>
            <Tip color="green"><Icon type="book" /> 课程</Tip>
            <Select disabled={disabled} defaultValue={lesson} style={{ width: 120 }} onChange={setLesson}>
            { 
                lessons.map(({lessonName,lessonID},key) => 
                    <Option key={`lesson-${key}`} value={key}>{lessonName}</Option>
                ) 
            }
            </Select>
            </FormItem>
            <FormItem>
            <Tip color="blue"><Icon type="home" /> 教室</Tip>
            <Select disabled={disabled} defaultValue={room} style={{ width: 180 }} onChange={setRoom}>
            {
                rooms.map(({roomID,roomName,siteCount,building}) => 
                    <Option value={roomID} key={`room-${roomID}`}>{`${building} ${roomName} 座位: ${siteCount}`}</Option>
                )
            }
            </Select>
            </FormItem>
            <FormItem>
                <Tip><Icon type="clock-circle" theme="filled" /> 课程时间</Tip>
                <RangePicker
                  disabled={disabled}
                  showTime={{ format: 'HH:mm' }}
                  format={dateFormat}
                  defaultValue={date}
                  placeholder={['开始时间', '结束时间']}
                  onChange={selectTime}
                  onOk={onOk}
                />
            </FormItem>
            <Button style={{color: 'green'}} onClick={disabled?view:submit} loading={load}>
                <Icon type={disabled?'eye':'check-circle'} theme="filled" 
                    style={{display: load?'none':'unset'}} />{disabled?'查看':'确认'}
            </Button>
        </div>
    )
}

export function RecordItem({lessonName,time,room,disabled=true}) {
    const [load,setLoad] = useState(false)
    const date=[moment(time[0], dateFormat),moment(time[1], dateFormat)]
    const [building,roomName,siteCount] = room.split(':')
    const view = () => { log('view') }
    const submit = () => { log('submit') }
    return (
        <div className="record-form" style={{padding: '10px 0'}}>
            <FormItem>
            <Tip color="green"><Icon type="book" /> 课程</Tip>
            <Select disabled={disabled} defaultValue={1} style={{ width: 120 }}>
                <Option value={1}>{lessonName}</Option>
            </Select>
            </FormItem>
            <FormItem>
            <Tip color="blue"><Icon type="home" /> 教室</Tip>
            <Select disabled={disabled} defaultValue={1} style={{ width: 180 }}>
                <Option value={1} key={`room-${1}`}>{`${building} ${roomName} 座位: ${siteCount}`}</Option>
            </Select>
            </FormItem>
            <FormItem>
                <Tip><Icon type="clock-circle" theme="filled" /> 课程时间</Tip>
                <RangePicker
                  disabled={disabled}
                  showTime={{ format: 'HH:mm' }}
                  format={dateFormat}
                  defaultValue={date}
                  placeholder={['开始时间', '结束时间']}
                />
            </FormItem>
            <Button style={{color: 'green'}} onClick={disabled?view:submit} loading={load}>
                <Icon type={disabled?'eye':'check-circle'} theme="filled" 
                    style={{display: load?'none':'unset'}} />{disabled?'查看':'确认'}
            </Button>
        </div>
    )
}