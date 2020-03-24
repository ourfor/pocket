import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import Loading from '../../../components/loading/loading'

const PATH = {
    login: ['/dashboard','dashboard/*']
}

// lazy load
const PageLogin = lazy(() => import(/* webpackChunkName: "dashboard-login" */'../login/login'))
const PageSetting = lazy(() => import(/* webpackChunkName: "dashboard-setting" */'../setting/setting'))
const PageDevice = lazy(() => import(/* webpackChunkName: "dashboard-device" */'../device/device'))
const PageStudent = lazy(() => import(/* webpackChunkName: "dashboard-student" */'../student/student'))
const PageTeacher = lazy(() => import(/* webpackChunkName: "dashboard-teacher" */'../teacher/teacher'))
const PageUser = lazy(() => import(/* webpackChunkName: "dashboard-user" */'../user/user'))
const PageRoom = lazy(() => import(/* webpackChunkName: "dashboard-room" */'../room/room'))
const PageHome = lazy(() => import(/* webpackChunkName: "dashboard-home" */'../home/home'))

const routes = [
    {path: '*', render: PageLogin, exact: false},
    {path: '/dashboard', render: PageHome },
    {path: '/dashboard/setting', render: PageSetting },
    {path: '/dashboard/device', render: PageDevice },
    {path: '/dashboard/student', render: PageStudent },
    {path: '/dashboard/teacher', render: PageTeacher },
    {path: '/dashboard/room', render: PageRoom },
    {path: '/dashboard/user', render: PageUser }
]

export const Root = ({store}) => {
    const [path,setPath] = useState(store.getState().login?{login:['/dashboard/login']}:PATH)
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            if(store.getState().login) setPath({...path,login: ['/dashboard/login']})
            else setPath({...path,login: ['*']})
        })
        return () => unsubscribe()
    },[])

    routes[0].path = path['login']

    return (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<Loading />}>
            <Switch>
                { 
                    routes.map(
                        ({path,render,exact=true}) => 
                        <Route key={path} exact={exact} strict 
                            path={path} component={render} />
                    )
                }
            </Switch>
            </Suspense>
        </Router>
    </Provider>
    )
}

