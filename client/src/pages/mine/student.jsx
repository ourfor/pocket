import { useState, useRef } from 'react'
import { Input, Tag, Button, message } from 'antd'
import { Div } from './style'

export default function Student({user}) {

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
        const mac = user.mac.split('')
        for(let i=0;i<6;i++) {
            const start = 2 * i
            addr[i] = mac[start]+mac[start+1]
        }
    }
    const eles = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()]

    const [mac,setMac] = useState(addr)
    const [disabled,setDisabled] = useState(true)
    const edit = () => {
        if(!disabled) {
            if(/^[0-9A-Fa-f]{12}$/.test(mac.join('')))
                message.success('蓝牙地址修改成功 🎉')
            else 
                message.error('再检查下, 蓝牙地址不合法 🌹')
        }
        setDisabled(!disabled)
    }
    const keydown = ({keyCode},i) => {
        if(keyCode===8&&mac[i]===""&&i>0) {
            const { current: prev } = eles[i-1]
            prev.focus()
        }
    }

    const input = ({ target: {value} },i) => {
        if(/^[0-9A-Fa-f]{0,2}$/.test(value)) {
                const modify = [...mac]
                modify[i] = value.toUpperCase()
                setMac(modify)
        }

        if(/^[0-9A-Fa-f]{2}$/.test(value)) {
            if(i<5) {
                const { current: next } = eles[i+1]
                next.focus()
            }
        }
    }

    const colors = ['blue','red','cadetblue','darkgray','pink','gold']
    const content = colors.map((color,i) => (
        <Tag color={color} key={`mac-${i}`}>
            <Input ref={eles[i]} tabIndex={i+1} 
            onChange={(e) => input(e,i)} onKeyDown={(e) => keydown(e,i)}
            disabled={disabled} className="bluetooth-addr" value={mac[i]} />
        </Tag>
        )
    )

    return (
        <div className="mine-bluetooth">
            <img src="/images/bluetooth.png" />
            <Tag color={'green'}>蓝牙地址</Tag>
            <Div>{content.slice(0,3)}</Div>
            <Div>{content.slice(3,6)}</Div>
            <Button onClick={edit}>{disabled?'修改':'确定'}</Button>
        </div>
    )
}