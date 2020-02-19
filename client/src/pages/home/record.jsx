import { useState, useEffect } from 'react'
import { Button, Icon, Select, DatePicker, message } from 'antd'
import styled from 'styled-components'
import axios from 'axios'

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
`

export function Record({dataLimit: {lessons,rooms}}) {
    const [record,setRecord] = useState([])
    const newRec = (e) => {
        log(e)
    }
    return (
        <div className="create-lesson-record">
            <Button type="primary" onClick={newRec}><Icon type="plus-circle" /> 新建考勤记录</Button>
            {lessons.length===0? null : <RecordForm lessons={lessons} rooms={rooms}/>}
        </div>
    )
}

export function RecordForm({lessons,rooms}) {
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
                }
            })
        
    }
    const selectTime = (value,dataStr) => setTime(dataStr)
    return (
        <div className="record-form" style={{paddingTop: '10px'}}>
            <FormItem>
            <Tip color="green"><Icon type="book" /> 课程</Tip>
            <Select defaultValue={lesson} style={{ width: 120 }} onChange={setLesson}>
            { 
                lessons.map(({lessonName,lessonID},key) => 
                    <Option key={`lesson-${key}`} value={key}>{lessonName}</Option>
                ) 
            }
            </Select>
            </FormItem>
            <FormItem>
            <Tip color="blue"><Icon type="home" /> 教室</Tip>
            <Select defaultValue={room} style={{ width: 180 }} onChange={setRoom}>
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
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                  onChange={selectTime}
                  onOk={onOk}
                />
            </FormItem>
            <Button style={{color: 'green'}} onClick={submit} loading={load}>
                <Icon type="check-circle" theme="filled" style={{display: load?'none':'unset'}} />确认
            </Button>
        </div>
    )
}