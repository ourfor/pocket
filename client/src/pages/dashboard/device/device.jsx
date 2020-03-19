import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tag, Input, Icon } from 'antd'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import { Table, Footer, Style } from '../../../components/table/table'
import Loading from '../../../components/loading/loading'
import { create, remove as rm, update as up } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

function Device({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [device,setDevice] = useState(null)
    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{devices {svrID,svrKey,version,svrCode,roomID,online,exception}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            columns[columns.length-1].render = (
                id => <Tag color="pink" name={id} onClick={() => setId(id)}>选择</Tag>
            )
            if(code===200) setData(data.devices)
        })
    }, [])

    useEffect(() => {
        data !==null && setDevice(() => data.filter(({svrID}) => svrID===id)[0])
    }, [id])

    return (
        <Style className="devices" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>设备列表 🍒</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={data} /> : <Loading />}
            <Footer id={id} add={{text: '添加设备 📱', action: add}} 
                    remove={{text: '删除设备 🤚', disabled: id===null, action: () => remove(id)}}
                    update={{text: '更新设备信息 💄', disabled: id===null, action: () => update(device)}}>
            </Footer>
        </Style>
    )
}

const remove = (id) => rm({
    title: {
        tip: '请输入设备📱ID以确认删除设备: ',
        success: msg => `成功删除设备(${msg})`,
        error: '设备删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteDevice(id: ${data}){
                svrCode
            }
        }
    `),
    result: ({ deleteDevice: { svrCode } }) => svrCode,
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 设备ID</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

const update = (device) => up({
    db: device,
    title: {
        tip: '不需要更新的设备信息留空即可(😆): 👀',
        success: msg => `成功更新设备(${msg})的信息`,
        error: '设备信息更新失败 😮',
    },
    Content: DeviceInfo,
    query: ({svrID,version,roomId}) => `
        mutation {
            updateDevice(device: {
                svrID: ${svrID},
                version: "${version}",
                roomID: ${roomId}
            }) {
                svrID
            }
        }
    `,
    result: ({updateDevice: { svrID }}) => svrID
})

const add = () => create({
    title: {
        tip: '请填写设备信息(😆): 👀',
        success: msg => `成功添加设备: ${msg}`,
        error: '设备添加失败 😮',
    },
    Content: DeviceInfo,
    query: ({svrCode,roomId,version}) => (`
        mutation {
            createDevice(device: {
                svrCode: "${svrCode}",
                roomID: ${roomId},
                version: "${version}"
            }){
                svrID
            }
        }
    `),
    result: ({createDevice: {svrID}}) => svrID
})

function DeviceInfo({set, disabled=false, value = {version: '1'}}) {
    const [svrCode,setSvrCode] = useState(value.svrCode)
    const [roomId,setRoomId] = useState(value.roomID)
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
                <Tip color="#c22f3c"><Icon type="idcard" /> 教室号</Tip>
                <Input value={roomId}
                    onChange={({target: {value}}) => setRoomId(value)} />
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