import { useState, useEffect, Suspense, lazy } from 'react'
import axios from 'axios'
import { MainContainer } from './style'
import MenuBar from '../../components/menu-bar/menu-bar'
import Loading from '../../components/loading/loading'

const Teacher = lazy(() => import('./teacher'))
const Student = lazy(() => import('./student'))

export default function HomePage({global}) {
    const { data } = global
    const { role, nickname, user } = data
    const [userInfo,setUserInfo] = useState({lessons: [], rooms: []})
    useEffect(() => {
        axios.get(`${$conf.api.host}/${role}/lessons?id=${user}`)
            .then(({data: {code,data}}) => {
                if(code===200) setUserInfo(data)
            })
    },[])
    const Role = role==="teacher"? Teacher : Student
    return (
        <MainContainer className="page-home">
            <section>
                <div className="headerbar">
                    <h3>👏 Welcome back {nickname}</h3>
                    <MenuBar className="headerbar-menu" />
                </div>
                <Suspense fallback={<Loading />}>
                    <Role data={userInfo} user={user} />
                </Suspense>
            </section>
        </MainContainer>
    )
}