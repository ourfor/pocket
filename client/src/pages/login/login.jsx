import styled from 'styled-components'
import LogoImage from './logo.png'

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
    padding: 50px 60px;
`

const LeftDiv = styled.div`
    width: 360px;
    padding-right: 60px;
    border-right: 1px solid #e6e6e6;
    box-sizing: border-box;
`

const Image = styled.img`
    width: 100px;
    height: 100px;
    border: 10px solid #e9e9e9;
    border-radius: 50%;
`

const Input = styled.input`
    height: 40px;
    width: 100%;
    padding-left: 15px!important;
    box-shadow: none;
    box-sizing: border-box;
    outline: none;
    display: block;
    padding: 6px;
    resize: none;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    font-size: 14px;
    background-color: #fff;
    color: #555;
    line-height: 1.428;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    margin-bottom: 20px;

    &:focus {
        border-color: #499ef3;
    }
`

const Button = styled.button`
    width: 112px;
    height: 38px;
    color: white;
    background-color: #f44336;
    border: none;
    font-size: 14px;
    padding: 0 10px;
    line-height: 38px;
    font-weight: 400;
    user-select: none;
    white-space: nowrap;
    border-radius: 10px;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #ff5722;
    }
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

function LeftArea() {
    return (
        <LeftDiv>
            <Image src={LogoImage} />
            <p>Zip的小窝</p>
            <Input name="email" placeholder="邮箱 / 用户名" />
            <Input name="passwd" type="password" placeholder="密码" />
            <Button>登录</Button>
        </LeftDiv>
    )
}

export default function Login() {
    return (
        <PageLogin>
            <LoginBox>
                <Content>
                    <LeftArea />
                </Content>
                <FooterBar>
                    <span style={{color: "black"}}>还没有账号?</span> <a>立即注册</a>&nbsp;&nbsp;<a>游客访问</a>
                </FooterBar>
            </LoginBox>
        </PageLogin>
    )
}