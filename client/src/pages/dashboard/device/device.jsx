import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tag, Input, Icon, Select } from 'antd'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import { Table, Footer, Style } from '../../../components/table/table'
import Loading from '../../../components/loading/loading'
import { create, remove as rm, update as up, UpdateButton, RemoveButton } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

const { Option } = Select

function Device({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [rooms,setRooms] = useState(null)
    const [type,setType] = useState(null)

    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{devices {svrID,svrKey,version,svrCode,roomID,online,exception},rooms{roomID,roomName,building}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                columns[columns.length-1].render = 
                    id => <RemoveButton onClick={() => action(id,false)}/>
                columns[columns.length-2].render = 
                    id => <UpdateButton onClick={() => action(id,true)}/>
                const map = {}
                const roomMap = {}
                const { devices,rooms } = data
                rooms.map(({roomID,roomName,building}) => (roomMap[roomID] = `${building} ${roomName}`))
                devices.map(device => {
                    device.roomName = roomMap[device.roomID]
                    map[device.svrID] = device
                })
                setData(map)
                setRooms(roomMap)
            }
        })
        function action(id,isUpdate) {
            setId(id)
            setType(isUpdate?`update-${Date.now()}`:'delete')
        }
    }, [])

    useEffect(() => {
        data !== null && type && id && (type==='delete'?remove(id,reload):update(data[id],rooms,reload))
    },[type,id])

    const reload = (device, type) => {
        switch(type) {
            case 'update':
            case 'create': {
                const tmp = {...data}
                device.roomName = rooms[device.roomID]
                tmp[device.svrID] = device
                setData(tmp)
                break
            }
            case 'delete': {
                const tmp = {...data}
                delete tmp[device.svrID]
                setData(tmp)
                setId(null)
                break
            }
            default: {}
        }
    }

    return (
        <Style className="devices" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>设备列表 🍒</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={Object.values(data)} /> : <Loading />}
            <Footer id={id} add={{text: '添加设备 📱', action: () => add(rooms,reload)}} >
            </Footer>
        </Style>
    )
}

const remove = (id,callback) => rm({
    title: {
        tip: '请输入设备📱ID以确认删除设备: ',
        success: msg => `成功删除设备(${msg})`,
        error: '设备删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteDevice(id: ${data}){
                svrID,svrCode
            }
        }
    `),
    result: ({ deleteDevice: { svrCode } }) => svrCode,
    callback: ({deleteDevice: device}) => callback(device,'delete'),
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 设备ID</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

const update = (device,rooms,callback) => up({
    db: device,
    title: {
        tip: '不需要更新的设备信息留空即可(😆): 👀',
        success: msg => `成功更新设备(${msg})的信息`,
        error: '设备信息更新失败 😮',
    },
    Content: (params) => <DeviceInfo rooms={rooms} {...params} />,
    query: ({svrID,version,roomId}) => `
        mutation {
            updateDevice(device: {
                svrID: ${svrID},
                version: "${version}",
                roomID: ${roomId}
            }) {
                svrID,svrKey,version,svrCode,roomID,online,exception
            }
        }
    `,
    result: ({updateDevice: { svrID }}) => svrID,
    callback: ({updateDevice: device}) => callback(device,'update')
})

const add = (rooms,callback) => create({
    title: {
        tip: '请填写设备信息(😆): 👀',
        success: msg => `成功添加设备: ${msg}`,
        error: '设备添加失败 😮',
    },
    Content: (params) => <DeviceInfo rooms={rooms} {...params} />,
    query: ({svrCode,roomId,version}) => (`
        mutation {
            createDevice(device: {
                svrCode: "${svrCode}",
                roomID: ${roomId},
                version: "${version}"
            }){
                svrID,svrKey,version,svrCode,roomID,online,exception
            }
        }
    `),
    result: ({createDevice: {svrID}}) => svrID,
    callback: ({createDevice: device}) => callback(device,'create')
})

function DeviceInfo({set, rooms=null, disabled=false, value = {version: '1'}}) {
    const keys = Object.keys(rooms)
    const [svrCode,setSvrCode] = useState(value.svrCode)
    const [roomId,setRoomId] = useState(value.roomID?value.roomID:keys[0])
    const [version,setVersion] = useState(value.version)
    
    useEffect(() => {
        set({
            svrCode,
            roomId,
            version,
            svrID: value.svrID
        })
    })
    return (
        <div>
            <FormItem gap={10} display="flex" width={280}>
                <Tip color="green"><Icon type="key" /> 设备标识码</Tip>
                <Input value={svrCode} 
                    onChange={({target: {value}}) => setSvrCode(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={120}>
                <Tip color="#c22f3c"><Icon type="idcard" /> 教室</Tip>
                <Select defaultValue={`${roomId}`} onChange={value => setRoomId(value)}>
                   {keys.map((key) => <Option value={key} key={key}>{rooms[key]}</Option>)}
                </Select>
            </FormItem>

            <FormItem gap={10} display="flex" width={120}>
                <Tip color="orange"><Icon type="version" /> 版本</Tip>
                <Input value={version}
                    onChange={({target: {value}}) => setVersion(value)} />
            </FormItem>
        </div>
    )
}

export default connect(Device)