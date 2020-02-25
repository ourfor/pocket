import { Button, Icon, Select, DatePicker, TimePicker } from 'antd'
import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'

import { Tip } from '../../components/tip/tip'
import { FormItem } from '../../components/form/form'

const { RangePicker } = DatePicker
const { Option } = Select
const dateFormat = 'YYYY-MM-DD HH:mm'

export function RecordItem({lessonName,time,room,disabled=true}) {
    const [load,setLoad] = useState(false)
    const date=[moment(time[0], dateFormat),moment(time[1], dateFormat)]
    const [building,roomName,siteCount] = room.split(':')
    const view = () => { 
        log('view') 
    }
    
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