import { useState, useRef } from 'react'
import axios from 'axios'
import { Input, Icon , Tag, Button, message, Select } from 'antd'
import { Tip } from '../../components/tip/tip'
import { FormItem } from '../../components/form/form'
import { Div } from './style'

const { Option } = Select

export default function Student({user,update}) {
    const [show,setShow] = useState(true)
    return (
        <div className="page-mine-student">
            <div className={`page-left-area ${show?'mobile-show':''}`} >
                <img  className="mine-avatar" src="/images/avatar.png" />
                <Form user={user} update={update}/>
            </div>
            <BlueTooth user={user} update={update} className={show?'':'mobile-show'} />
            <Button className="switch" onClick={() => setShow(!show)} />
        </div>
    )
}

function Form({user,update}) {
    const [disabled,setDisabled] = useState(true)
    const [nickname,setNickname] = useState(user.nickname)
    const [sex,setSex] = useState(user.sex)

    const edit = () => {
        if(disabled) setDisabled(!disabled)
        else {
            setDisabled(!disabled)
            if(nickname !== user.nickname || sex !== user.sex) {
                const data = `id=${user.id}&sex=${sex===1}&nickname=${nickname}`
                axios.patch(`${$conf.api.host}/student`,data)
                    .then(({data: {code,data,msg}}) => {
                        if(code===200) {
                            update({nickname,sex})
                            message.success('信息更新成功 👌')
                        }
                        else message.error(msg)
                    })
            }
        }
    }
    return (
        <div className="mine-info-form">
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="user" /> 昵称</Tip>
                <Input disabled={disabled} value={nickname} 
                    onChange={({target: {value}}) => setNickname(value)} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="#c22f3c"><Icon type="idcard" /> 学号</Tip>
                <Input disabled value={user.user} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="blue"><Icon type="key" /> 性别</Tip>
                <Select disabled={disabled} defaultValue={sex} onChange={setSex}>
                    <Option value={1}><Icon type="man" /> 男</Option>
                    <Option value={0}><Icon type="woman" /> 女</Option>
                </Select>
            </FormItem>

            <FormItem gap={10} display="flex">
                <Button onClick={edit}>{disabled? '修改':'确定'}</Button>
            </FormItem>
        </div>
    )
}

function BlueTooth({user, update, className}) {
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
            const addr = mac.join('')
            if(user.mac.toUpperCase() !== addr)
                if(/^[0-9A-Fa-f]{12}$/.test(addr)) {
                    const data = `id=${user.id}&mac=${addr}`
                    axios.patch(`${$conf.api.host}/student`,data)
                        .then(({data: {code,data,msg}}) => {
                            if(code===200) {
                                update({mac: addr})
                                message.success('蓝牙地址修改成功 🎉')
                            }
                            else message.error(msg)
                        })
                }
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
        <div className={`mine-bluetooth ${className}`}>
            <img src="/images/bluetooth.png" />
            <Tag color={'green'}>蓝牙地址</Tag>
            <Div>{content.slice(0,3)}</Div>
            <Div>{content.slice(3,6)}</Div>
            <Button onClick={edit}>{disabled?'修改':'确定'}</Button>
        </div>
    )
}