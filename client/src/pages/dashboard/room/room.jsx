import { useState, useEffect } from 'react'
import { Button, Tag, message, Input, Icon, Select } from 'antd'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { Table, Footer, Style } from '../../../components/table/table'
import { create, remove as rm, update as up, UpdateButton, RemoveButton } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

const { Option } = Select


function Room({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [type,setType] = useState(null)

    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{rooms {roomName,roomID,siteCount,building}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                const { rooms } = data
                columns[columns.length-1].render = 
                    id => <RemoveButton onClick={() => action(id,false)}/>
                columns[columns.length-2].render = 
                    id => <UpdateButton onClick={() => action(id,true)}/>
                const map = {}
                rooms.map((room) => (map[room.roomID] = room))
                setData(map)
            }
        })

        function action(id,isUpdate) {
            setId(id)
            setType(isUpdate?`update-${Date.now()}`:'delete')
        }
    }, [])

    useEffect(() => {
        data !== null && type && id && (type==='delete'?remove(id,reload):update(data[id],reload))
    },[type,id])

    const reload = (room, type) => {
        switch(type) {
            case 'update':
            case 'create': {
                const tmp = {...data}
                tmp[room.roomID] = room
                setData(tmp)
                break
            }
            case 'delete': {
                const tmp = {...data}
                delete tmp[room.roomID]
                setData(tmp)
                setId(null)
                break
            }
            default: {}
        }
    }

    return (
        <Style className="students" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>教室列表 🍐</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={Object.values(data)} /> : <Loading />}
            <Footer id={id} add={{text: '添加教室 🏫', action: () => add(reload)}} >
            </Footer>
        </Style>
    )
}

const add = (callback) => create({
    title: {
        tip: '请填写学生信息: 👀',
        success: msg => `成功添加学生 ${msg}`,
        error: '学生添加失败 😮',
    },
    Content: RoomInfo,
    query: ({roomName, roomID, building, siteCount}) => (`
        mutation {
            createRoom(room: {
                roomName: "${roomName}",
                roomID: ${roomID},
                building: "${building}",
                siteCount: ${siteCount}
            }){
                roomName, roomID, siteCount, building
            }
        }
    `),
    result: ({createRoom: {roomName}}) => roomName,
    callback: ({ createRoom: room }) => callback(room,'create')
})

const update = (room,callback) => up({
    db: room,
    title: {
        tip: '不需要更新的信息留空即可',
        success: msg => `成功更新教室 ${msg} 的信息 👌`,
        error: '教室信息更新失败 😮',
    },
    Content: RoomInfo,
    query: ({roomName, roomID, building, siteCount}) => `
        mutation {
            updateRoom(room: {
                roomName: "${roomName}",
                roomID: ${roomID},
                building: "${building}",
                siteCount: ${siteCount}
            }){
                roomName, roomID, siteCount, building
            }
        }
    `,
    result: ({updateRoom: { roomName }}) => roomName,
    callback: ({ updateRoom: room }) => callback(room,'update')
})

const remove = (id,callback) => rm({
    title: {
        tip: '请输入教室👨‍🎓ID以确认删除教室信息: ',
        success: msg => `成功删除教室 ${msg} `,
        error: '教室删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteRoom(id: ${data}){
                roomName,roomID
            }
        }
    `),
    result: ({ deleteRoom: { roomName } }) => roomName,
    callback: ({ deleteRoom: room }) => callback(room,'delete'),
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 教室ID</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

function RoomInfo({value={},set,disabled=false}) {
    const [roomName,setRoomName] = useState(value.roomName)
    const [roomID,setRoomID] = useState(value.roomID)
    const [building,setBuilding] = useState(value.building)
    const [siteCount,setSiteCount] = useState(value.siteCount)
    
    useEffect(() => {
        set({ roomName, roomID, building, siteCount })
    })

    return (
        <div>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="user" /> 教室名称</Tip>
                <Input value={roomName} 
                    onChange={({target: {value}}) => setRoomName(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={240}>
                <Tip color="#c22f3c"><Icon type="idcard" /> 教室ID</Tip>
                <Input disabled={disabled} value={roomID}
                    onChange={({target: {value}}) => setRoomID(value)} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="orange"><Icon type="key" /> 建筑名</Tip>
                <Input value={building} autoComplete="new-password"
                    onChange={({target: {value}}) => setBuilding(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={200}>
                <Tip color="black"><Icon type="gold" /> 座位个数</Tip>
                <Input value={siteCount}
                    onChange={({target: {value}}) => setSiteCount(value)}  />
            </FormItem>
        </div>
    )
}

export default connect(Room)