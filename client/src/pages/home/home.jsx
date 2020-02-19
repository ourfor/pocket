import { useState, useEffect } from 'react'
import axios from 'axios'
import { Lessons } from './lessons'
import { Record } from './record'
import { MainContainer } from './style'

export default function HomePage({global}) {
    const { data } = global
    const [userInfo,setUserInfo] = useState({lessons: [], rooms: []})
    useEffect(() => {
        axios.get(`${$conf.api.host}/teacher/lessons?id=${data.user}`)
            .then(({data: {code,data}}) => {
                if(code===200) setUserInfo(data)
            })
    },[])

    return (
        <MainContainer className="page-home">
            <section>
                <h3>👏 Welcome back {data.nickname}</h3>
                <Lessons dataSource={userInfo.lessons} />
                <Record dataLimit={userInfo} />
            </section>
        </MainContainer>
    )
}