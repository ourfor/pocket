import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store/connect'
import axios from 'axios'
import { message, Button } from 'antd'
import { md5 } from '../../tools/md5'
import LogoImage from './logo.png'
import welcome_image from './welcome.jpg'
import slogan_image from './slogan.png'
import './login.scss'

const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #f2f2f2;
    font-family: helvetica neue,helvetica,arial,pingfang sc,hiragino sans gb,microsoft yahei,wenquanyi micro hei,sans-serif;
`

const LoginBox = styled.section`
    width: 714px;
    min-height: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);
`

const Content = styled.section`
    flex-grow: 1;
    width: 100%;
    display: flex;
    padding: 50px 60px;
    box-sizing: border-box;
`

const LeftDiv = styled.div`
    width: 360px;
    text-align: center;
    padding-right: 60px;
    border-right: 1px solid #e6e6e6;
    box-sizing: border-box;
    flex-shrink: 0;

    & .login-type {
        text-align: left;
        font-size: 14px;
        color: #919191;
        padding: 2px 8px 10px;
        box-sizing: border-box;
    }
`

const RightDiv = styled.div`
    flex-shrink: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Image = styled.img`
    width: 100px;
    height: 100px;
    border: 10px solid #e9e9e9;
    border-radius: 50%;
`

const FooterBar = styled.footer`
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-align: left;
    background-color: #f5f5f5;
    padding: 0 60px;
    color: #66b7ff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

function RightArea() {
    return (
        <RightDiv>
            <img src={welcome_image} style={{width: '100%',marginBottom: '20px'}}/>
            <img src={slogan_image} style={{width: '50%'}}/>
        </RightDiv>
    )
}

function LeftArea({dispatch}) {
    const history = useHistory()
    const [type,setType] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [nameInput,passwdInput] = [useRef(),useRef()]
    const [load,setLoad] = useState(false)
    function submit() {
        if(username===''||password==='') {
            message.error('用户名和密码不可为空 👇')
            if(username==='') nameInput.current.focus()
            else passwdInput.current.focus()
            return 
        }
        setLoad(true)
        const data = {
            username,password,type: type?'teacher':'student'
        }
        const str = JSON.stringify(data)
        axios.post(`${$conf.api.host}/auth`,{data,md5: md5(str+'login')})
            .then(({data: {code,data}}) => {
                if(code===200) {
                    const tmp = { ...data, sex: data.sex?1:0, id: data.user}
                    message.success('👏 登录成功! 即将调转到个人主页')
                    localStorage.setItem('data-auth',JSON.stringify(tmp))
                    dispatch({type: 'login',login: true,data: tmp})
                    history.push('/')
                } else {
                    log(code)
                    message.error('🤔 用户名或密码错误, 或许你忘记选择登录身份了😂')
                }
                setLoad(false)
            })
    }
    return (
        <LeftDiv>
            <Image src={LogoImage} />
            <p style={{marginTop: '10px'}}>基于蓝牙技术的智能手机袋</p>
            <input ref={nameInput} required className="login-input" value={username}
                onChange={({target: {value}}) => setUsername(value)}
                name="username" placeholder="邮箱 / 用户名" />
            <input ref={passwdInput} required className="login-input" name="password" value={password}
                onChange={({target: {value}}) => setPassword(value)}
            type="password" placeholder="密码" />
            <div className="login-type">
                <input type="checkbox" onChange={({target: {checked}}) => {setType(checked)}} 
                    checked={type} name="isTeacher"/> 教师登录 
            </div>
            <Button loading={load} className="login-submit" onClick={submit}>登录</Button>
        </LeftDiv>
    )
}

export function PageLogin({global: {theme}, dispatch}) {
    return (
        <Login className={`page-login theme-${theme}`} theme={theme}>
            <LoginBox>
                <Content>
                    <LeftArea dispatch={dispatch}/>
                    <RightArea />
                </Content>
                <FooterBar>
                    <span style={{color: "black"}}>还没有账号?</span> <a>立即注册</a>&nbsp;&nbsp;<a>游客访问</a>
                </FooterBar>
            </LoginBox>
        </Login>
    )
}

export default connect(PageLogin)