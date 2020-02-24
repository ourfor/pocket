import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import Loading from '../components/loading/loading'
import { Theme } from '../theme/theme'

// lazy import, optimization
const PageLogin = lazy(() => import('../pages/login/login'))
const PageHome = lazy(() => import('../pages/home/home'))
const PageRecord = lazy(() => import('../pages/record/record'))
const PageMine = lazy(() => import('../pages/mine/mine'))


export function MainRouter({store}) {
    const [global,setGlobal] = useState(store.getState())
    const [path,setPath] = useState({login: global.login?'/login':'*'})
    const [auth,setAuth] = useState(localStorage.getItem('data-auth'))

    const { dispatch } = store

    useEffect(() => {
        const id = store.subscribe(() => setGlobal(store.getState()))
        return () => id.unsubscribe()
    },[])

    useEffect(() => {
        if(global.isLogin) setPath({login: '/login'})
    },[global])

    return (
        <Provider store={store}>
        <Router>
            <Theme />
            <Suspense fallback={<Loading />} >
            <Switch>
                <Route path={path['login']} component={PageLogin} />
                <Route exact strict path={['/','/home']} component={PageHome} />
                <Route exact strict path="/record" component={PageRecord} />
                <Route exact strict path="/mine" component={PageMine} />
            </Switch>
            </Suspense>
        </Router>
        </Provider>
    )
}