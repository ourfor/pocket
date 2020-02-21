import { useState, useEffect, Suspense, lazy } from 'react'
import axios from 'axios'
import { MainContainer } from './style'
import MenuBar from '../../components/menu-bar/menu-bar'
import Loading from '../../components/loading/loading'

const Teacher = lazy(() => import('./teacher'))
const Student = lazy(() => import('./student'))

export default function HomePage({global,dispatch}) {
    const { data, home } = global
    const { role, nickname, user } = data
    const [userInfo,setUserInfo] = useState(home? home:{lessons: [], rooms: []})

    useEffect(() => {
        let result = null
        const { lessons } = userInfo
        if(lessons.length === 0)
        axios.get(`${$conf.api.host}/${role}/lessons?id=${user}`)
            .then(({data: {code,data}}) => {
                if(code===200) {
                    setUserInfo(data)
                    result = data
                }
            })
        return () => {
            dispatch({type: 'home', home: result})
        }
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
                    <Role data={userInfo} user={user} dispatch={dispatch} todo={[]} />
                </Suspense>
            </section>
        </MainContainer>
    )
}