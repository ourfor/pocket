import { useState, useEffect } from 'react'
import { Link, useHistory, useRouter } from 'react-router-dom'
import axios from 'axios'
import { Icon, Drawer, Input, Button, message } from 'antd'
import { connect } from '../../../store/connect'
import { ButtonTip, Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'
import { Style } from './style'

function Home({global,dispatch}) {
    const history = useHistory()
    const [visible,setVisible] = useState(false)
    const [config,setConfig] = useState({frequent: 10})
    const [load,setLoad] = useState(false)
    useEffect(() => {
        axios.get(`${$conf.api.host}/admin/config`)
            .then(({ data: { code, data }}) => {
                if(code === 200) {
                    setConfig(data)
                }
            })
    },[])

    const go = (path) => {
        history.push(`/dashboard/${path}`)
    }

    const logout = () => {
        localStorage.removeItem('data-system')
        dispatch({type: 'logout'})
        history.push('/dashboard')
    }

    const change = (key,{target: {value}}) => {
        const result = {...config}
        result[key] = value
        setConfig(result)
    }

    const save = () => {
        if(!/^[0-9]{1,}$/.test(config.frequent)) {
            message.error('输入值应为纯数字 🙄')
            return
        }
        setLoad(true)
        axios.get(`${$conf.api.host}/admin/config?frequent=${config.frequent}`)
            .then(({data: {code,data,msg}}) => {
                if(code===200) {
                    message.success(`${msg} 🙂`)
                } else {
                    message.error('设置失败 😰')
                }
                setLoad(false)
            })
    }

    return (
        <Style className="home">
            <Tip color="#251041"><Icon type="appstore" /> 常用功能</Tip>
            <section className="menus">
                <ButtonTip type="shake" text="代理服务器" 
                    theme="green" onClick={() => go('device')} />
                <ButtonTip type="setting" text="偏好设置" 
                    theme="#442b4b" onClick={()=>setVisible(!visible)} />
                <ButtonTip type="user" text="学生管理" 
                    theme="#9e26c0" onClick={() => go('student')} />
                <ButtonTip type="user" text="教师管理" 
                    theme="#6126c0" onClick={() => go('teacher')}/>
                <ButtonTip type="home" text="教室管理" 
                    theme="#ef0f36" onClick={() => go('room')}/>
                <ButtonTip type="usergroup-add" text="用户管理" 
                    theme="#ff2e52d9" onClick={() => go('user')}/>
            </section>
            <Drawer height={360} visible={visible} 
                closable={true} onClose={()=>setVisible(!visible)} 
                title="偏好设置🔜" placement="bottom">
                <FormItem>
                    <Tip><Icon type="sync" spin /> 记录扫描频率 </Tip>
                    <Input defaultValue={config.frequent} 
                        onChange={e => change('frequent',e)} 
                        style={{width: 60}} />&nbsp;分钟/次&nbsp;
                        <Button loading={load} onClick={save}>确定</Button>
                </FormItem>
            </Drawer>
            <Button className="logout" onClick={logout}>
                <Icon type="logout" />
            </Button>
        </Style>
    )
}

export default connect(Home)