import { useState } from 'react'
import { Input, Button, Icon } from 'antd'
import { Style } from './style'
import { connect } from '../../../store/connect'
import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'
import { DateTime } from '../../../hook/useTime'

function Login({global,dispatch}) {
    const [username,setUsername] = useState('')
    const [passwd,setPasswd] = useState('')

    return (
        <Style>
            <DateTime />
            <div className="content">
                <FormItem gap={10} display="flex">
                    <Tip color="green" width={80}><Icon type="user" /> 账号</Tip>
                    <Input value={username} onChange={({target: {value}}) => setUsername(value)} />
                </FormItem>
                <FormItem gap={10} display="flex">
                    <Tip color="#c22f3c" width={80}><Icon type="key" /> 密码</Tip>
                    <Input type="password" value={passwd} onChange={({target: {value}}) => setPasswd(value)} />
                </FormItem>
                <Button>登录</Button>
            </div>
        </Style>
    )
}

export default connect(Login)