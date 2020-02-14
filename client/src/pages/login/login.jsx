import styled from 'styled-components'
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

function LeftArea() {
    return (
        <LeftDiv>
            <Image src={LogoImage} />
            <p>基于蓝牙技术的智能手机袋</p>
            <input className="login-input" name="email" placeholder="邮箱 / 用户名" />
            <input className="login-input" name="passwd" type="password" placeholder="密码" />
            <button className="login-submit">登录</button>
        </LeftDiv>
    )
}

export default function Login() {
    return (
        <PageLogin className="page-login">
            <LoginBox>
                <Content>
                    <LeftArea />
                    <RightArea />
                </Content>
                <FooterBar>
                    <span style={{color: "black"}}>还没有账号?</span> <a>立即注册</a>&nbsp;&nbsp;<a>游客访问</a>
                </FooterBar>
            </LoginBox>
        </PageLogin>
    )
}