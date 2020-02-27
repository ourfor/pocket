import { useState, useRef } from 'react'
import { Input, Button, Icon, message } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Style } from './style'
import { md5 } from '../../../tools/md5'
import { connect } from '../../../store/connect'
import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'
import { DateTime } from '../../../hook/useTime'

function Login({global,dispatch}) {
    const history = useHistory()
    const [username,setUsername] = useState('')
    const [passwd,setPasswd] = useState('')
    const [load,setLoad] = useState(false)
    const inputName = useRef()
    const inputPasswd = useRef()

    const submit = () => {
        if(username==='') {
            inputName.current.focus()
            message.error('请输入用户名 😅')
        } else if(passwd==='') {
            inputPasswd.current.focus()
            message.error('请输入密码 😱')
        } else {
            if(!/[0-9]{1,}/.test(username)) {
                message.error('账号不合法, 应为纯数字组成 😰')
                return 
            }
            setLoad(true)
            const data = {
                username,
                passwd
            }
            const str = JSON.stringify(data)
            axios.post(`${$conf.api.host}/admin/auth`,{data,md5: md5(str+'login')})
                .then(({data: { data, code}}) => {
                    setLoad(false)
                    if(code===200) {
                        message.success('登录成功, 即将跳转到控制台 😊')
                        dispatch({type: 'login', dashboard: data})
                        history.push('/dashboard')
                    } else {
                        message.error('密码错误, 请查验后重试 😨')
                    }
                })
        }
    }

    return (
        <Style>
            <img className="logo" src="/favicon.ico" />
            <div className="content">
                <FormItem gap={10} display="flex">
                    <Tip color="green" width={80}><Icon type="user" /> 账号</Tip>
                    <Input ref={inputName} value={username} onChange={({target: {value}}) => setUsername(value)} />
                </FormItem>
                <FormItem gap={10} display="flex">
                    <Tip color="#c22f3c" width={80}><Icon type="key" /> 密码</Tip>
                    <Input ref={inputPasswd} type="password" value={passwd} onChange={({target: {value}}) => setPasswd(value)} />
                </FormItem>
                <Button loading={load} onClick={submit}>登录</Button>
            </div>
            <DateTime className="time" />
        </Style>
    )
}

export default connect(Login)