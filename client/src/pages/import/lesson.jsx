import { useState, useEffect } from 'react'
import axios from 'axios'
import { Input, Icon, Select, DatePicker, Button, message } from 'antd'
import moment from 'moment'
import { Tip } from '../../components/tip/tip'
import { FormItem } from '../../components/form/form'

const { Option } = Select
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD HH:mm'

const { weekday, period } = $conf.lesson

const WEEKDAY = weekday? weekday:['周日','周一','周二','周三','周四','周五','周六']
const PERIOD = period? period:[
    '上午第一节课','上午第二节课','上午三节课','上午四节课',
    '下午第一节课','下午第二节课','下午第三节课','下午第四节课',
    '晚上第一节课','晚上第二节课','晚上第三节课','晚上第四节课'
]
const CLASS = ['测试班级1','测试班级2','测试班级3']
const NOW = new Date()
const YEAR = NOW.getFullYear()
const DATE = NOW.toLocaleDateString().split(' ')[0]
const TIME = NOW.toTimeString().split(' ')[0]
const defaultValue = {
    lessonID: '',
    lessonName: '',
    term: `${YEAR}.1`,
    period: 0,
    weekDay: 0,
    datetime: [`${DATE} ${TIME}`,`${DATE} ${TIME}`],
    roomID: null,
    beginTime: null,
    endTime: null
}

export function Lesson({finish,rooms,value=defaultValue,teachId=0,set,hidden}) {
    const [lessonId,setLessonId] = useState(value.lessonID)
    const [lessonName,setLessonName] = useState(value.lessonName)
    const [term,setTerm] = useState(value.term)
    const [period,setPeriod] = useState(value.period)
    const [weekday,setWeekday] = useState(value.weekDay)
    const [roomId,setRoomId] = useState(value.roomID?value.roomID:rooms[0].roomID)
    const [datetime,setDatetime] = useState(value.endTime?[value.beginTime,value.endTime]:value.datetime)
    const date=[moment(datetime[0], dateFormat),moment(datetime[1], dateFormat)]
    const [classNo,setClassNo] = useState([])
    const [load,setLoad] = useState(false)
    const [classes,setClasses] = useState([])

    useEffect(() => {
        axios.get(`${$conf.api.host}/student/classes`)
            .then(({data: {code,data}}) => {
                if(code===200) {
                    setClasses(data)
                }
            })
    },[])

    useEffect(() => {
        set({
            lessonId, lessonName,
            term, period,
            weekday, classNo,
            teachId: Number(teachId), roomId,
            datetime: [
                new Date(datetime[0]).getTime(),
                new Date(datetime[1]).getTime()
            ]
        })
    })

    const onOk = () => {
        if(lessonName==='') {
            message.error('课程名不可为空 🥭')
        } else if(lessonId==='') {
            message.error('课程代号不可为空 🥭')
        } else {
            setLoad(true)
            const data = {
                lessonId,
                lessonName,
                term,
                period,
                weekday,
                classNo,
                teachId: Number(teachId),
                roomId,
                datetime: [
                    new Date(datetime[0]).getTime(),
                    new Date(datetime[1]).getTime()
                ]
            }
            !hidden && axios.post(`${$conf.api.host}/lessons`,JSON.stringify(data),{headers: {
                "Content-Type": 'application/json'
            }}).then(({data: {data,code,msg}}) => {
                    if(code === 200) {
                        message.success('课程添加成功 🚥')
                    } else {
                        message.error(`${msg} 😱`)
                    }
                    setLoad(false)
                    finish(data)
                })
            return data
        }
    }
    
    return (
        <div className="add-lesson">
            <div className="row">
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="key" /> 课程代号</Tip>
                <Input value={lessonId} style={{width: 150}} 
                    onChange={({target: {value}}) => setLessonId(value)} />
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="#1890ff"><Icon type="key" /> 课程名</Tip>
                <Input value={lessonName} style={{width: 250}} 
                    onChange={({target: {value}}) => setLessonName(value)} />
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="#f5222d"><Icon type="table" /> 开课学期</Tip>
                <Select defaultValue={term} onChange={setTerm}>
                    <Option value={`${YEAR}.1`} >2020年 春季</Option>
                    <Option value={`${YEAR}.2`} >2020年 秋季</Option>
                </Select>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="key" /> 节次</Tip>
                <Select defaultValue={period} onChange={setPeriod}>
                    {PERIOD.map((period,i) => <Option key={i} value={i} >{period}</Option>)}
                </Select>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="violet"><Icon type="calendar" /> 周次</Tip>
                <Select value={weekday} onChange={setWeekday}>
                    {WEEKDAY.map((DAY,i) => <Option key={i} value={i} >{DAY}</Option>)}
                </Select>
            </FormItem>
            </div>
            <div className="row">
            <FormItem gap={10} display="flex">
                <Tip><Icon type="clock-circle" theme="filled" /> 课程时间</Tip>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format={dateFormat}
                  defaultValue={date}
                  onChange={(date,dateStr) => setDatetime(dateStr)}
                  placeholder={['开始时间', '结束时间']}
                />
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="key" /> 上课地点</Tip>
                <Select value={roomId} onChange={setRoomId}>
                    {rooms.map(({roomID,building,roomName,siteCount},i) => 
                        <Option key={i} value={roomID} >{`${building} ${roomName} 座位数:${siteCount}`}</Option>)}
                </Select>
            </FormItem>
            </div>
            <div className="row">
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="calendar" /> 添加班级</Tip>
                <Select defaultValue={classNo} style={{minWidth: 200}} 
                        mode="multiple" onChange={setClassNo}>
                    {classes.map((item,i) => <Option key={i} value={item} >{item}</Option>)}
                </Select>
            </FormItem>
            </div>
            <FormItem gap={10} display="flex">
                <Button style={{display: hidden?'none':'unset'}} loading={load} 
                    onClick={onOk}>完成编辑</Button>
            </FormItem>
        </div>
    )
}