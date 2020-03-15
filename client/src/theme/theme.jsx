import { connect } from '../store/connect'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { message } from 'antd'
import sun from './sun.svg'
import moon from './moon.svg'

export function Skin({global: {theme},dispatch}) {
    const [light,setLight] = useState(theme==="light")
    const dress = () => {
        dispatch({type: 'theme', theme: !light?$conf.theme[1]:$conf.theme[0]})
        setLight(() => !light)
        message.success(`主题成功修改为 ${light?'Night':'Light'} 🍓`)
    }

    useEffect(() => {
        import(/* webpackChunkName: "theme-[request]" */`../sass/themes/${theme}.scss`)
        .then(module => {
            notify(theme)
        })
    },[theme])

    return (
        <Button onClick={dress} light={light} />
    )
}

export function notify(theme){
    const template = `\n %c ⛱ Zip Pocket Theme ${theme} %c 🍑 pocket.ourfor.top \n\n`
    const style = {
        start: "color: dark; background: #f3e7e7; padding:5px 0;",
        end: "color: white; background: #dc1049; padding:5px 0;"
    }
    log(template,style.start,style.end)
}

const Button = styled.button`
    position: fixed;
    top: 50%;
    right: 10px;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    transform: translate(0,-20px);
    background: url(${props => props.light?moon:sun}) no-repeat;
    background-size: contain;
    cursor: pointer;
`

export const Theme = connect(Skin)