import { useState, useEffect, Suspense, lazy } from 'react'
import axios from 'axios'
import { connect } from '../../store/connect'
import { MainContainer, Container } from './style'
import MenuBar from '../../components/menu-bar/menu-bar'
import Loading from '../../components/loading/loading'

const Teacher = lazy(() => import('./teacher'))
const Student = lazy(() => import('./student'))

export function HomePage({global,dispatch}) {
    const { data, home, theme } = global
    const { role, nickname, user } = data
    const [db,setDB] = useState(home? home:{lessons: [], rooms: [],todo: []})
    
    useEffect(() => {
        let result = null
        const { lessons } = db
        if(lessons.length === 0)
        axios.get(`${$conf.api.host}/${role}/lessons?id=${user}`)
            .then(({data: {code,data}}) => {
                if(code===200) {
                    setDB(data)
                    result = data
                }
            })
        return () => {
            dispatch({type: 'home', home: result})
        }
    },[])
    const isTeacher = role==="teacher"
    const Role =  isTeacher? Teacher : Student
    const menus = isTeacher? null : ['home','mine','history']
    return (
        <Container className="page-home" theme={theme}>
            <section role={role}>
                <div className="headerbar">
                    <h3>👏 Welcome back {nickname}</h3>
                    <MenuBar className="headerbar-menu" menus={menus}/>
                </div>
                <Suspense fallback={<Loading />}>
                    <Role data={db} user={data} dispatch={dispatch} todo={db.todo} />
                </Suspense>
            </section>
        </Container>
    )
}

export default connect(HomePage)