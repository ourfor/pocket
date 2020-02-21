import { useState } from 'react'
import { Input, Tag, Button } from 'antd'
import { Div } from './style'

export default function Student({user}) {
    log(user)
    return (
        <div className="page-mine-student">
            <div className="page-left-area">
                <img  className="mine-avatar" src="/images/avatar.png" />
                <Form user={user} />
            </div>
            <BlueTooth user={{...user,mac: 'A0C589E375FF'}}/>
        </div>
    )
}

function Form({user}) {
    return (
        <div className="mine-info-form">
            <Input addonBefore="昵称" value={user.nickname} />
            <Input addonBefore="学号" value={user.user} />
        </div>
    )
}

function BlueTooth({user}) {
    const addr = ['00','00','00','00','00','00']
    if(!/unknown/.test(user.mac)) {
        for(let i=0;i<6;i++) {
            const start = 2 * i
            addr[i] = user.mac.substr(start,start+2)
        }
    }

    const [mac,setMac] = useState(addr)
    const [disabled,setDisabled] = useState(true)
    const edit = () => {
        setDisabled(!disabled)
    }

    return (
        <div className="mine-bluetooth">
            <img src="/images/bluetooth.png" />
            <Tag color={'green'}>蓝牙地址</Tag>
            <Div>
                <Tag color={'blue'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[0]} />
                </Tag>
                <Tag color={'red'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[1]} />
                </Tag>
                <Tag color={'cadetblue'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[2]} />
                </Tag>
            </Div>
            <Div>
                <Tag color={'darkgray'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[3]} />
                </Tag>
                <Tag color={'pink'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[4]} />
                </Tag>
                <Tag color={'gold'}>
                    <Input disabled={disabled} className="bluetooth-addr" value={mac[5]} />
                </Tag>
            </Div>
            <Button onClick={edit}>{disabled?'修改':'确定'}</Button>
        </div>
    )
}