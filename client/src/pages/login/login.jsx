import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { md5 } from '../../tools/md5'
import LogoImage from './logo.png'
import BluetoothImage from './bluetooth.png'
import './login.scss'

const PageLogin = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
    background: #f2f2f2;
    position: relative;
    font-family: helvetica neue,helvetica,arial,pingfang sc,hiragino sans gb,microsoft yahei,wenquanyi micro hei,sans-serif;
`

const LoginBox = styled.div`
    width: 714px;
    min-height: 500px;
    margin: auto;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
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
            <img src={BluetoothImage} style={{width: '100%'}}/>
        </RightDiv>
    )
}

function LeftArea({dispatch}) {
    const history = useHistory()
    const [type,setType] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    function submit() {
        const data = {
            username,password,type: type?'teacher':'student'
        }
        const str = JSON.stringify(data)
        axios.post('http://localhost:8443/auth',{data,md5: md5(str+'login')})
            .then(({data: {code,data}}) => {
                if(code===200) {
                    localStorage.setItem('data-auth',JSON.stringify(data))
                    dispatch({type: 'update',isLogin: true,data})
                    history.push('/')
                }
            })
    }
    return (
        <LeftDiv>
            <Image src={LogoImage} />
            <p>基于蓝牙技术的智能手机袋</p>
            <input className="login-input" value={username}
                onChange={({target: {value}}) => setUsername(value)}
                name="username" placeholder="邮箱 / 用户名" />
            <input className="login-input" name="password" value={password}
                onChange={({target: {value}}) => setPassword(value)}
            type="password" placeholder="密码" />
            <div className="login-type">
                <input type="checkbox" onChange={({target: {checked}}) => {setType(checked)}} 
                    checked={type} name="isTeacher"/> 教师登录 
            </div>
            <button className="login-submit" onClick={submit}>登录</button>
        </LeftDiv>
    )
}

export default function Login({dispatch}) {
    return (
        <PageLogin className="page-login">
            <LoginBox>
                <Content>
                    <LeftArea dispatch={dispatch}/>
                    <RightArea />
                </Content>
                <FooterBar>
                    <span style={{color: "black"}}>还没有账号?</span> <a>立即注册</a>&nbsp;&nbsp;<a>游客访问</a>
                </FooterBar>
            </LoginBox>
        </PageLogin>
    )
}