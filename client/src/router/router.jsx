import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import Loading from '../components/loading/loading'
import { Theme } from '../theme/theme'

// lazy import, optimization
const PageLogin = lazy(() => import(/* webpackChunkName: "page-login" */'../pages/login/login'))
const PageHome = lazy(() => import(/* webpackChunkName: "page-home" */'../pages/home/home'))
const PageRecord = lazy(() => import(/* webpackChunkName: "page-record" */'../pages/record/record'))
const PageMine = lazy(() => import(/* webpackChunkName: "page-mine" */'../pages/mine/mine'))
const PageImport = lazy(() => import(/* webpackChunkName: "page-import" */'../pages/import/import'))
const PageDashboard = lazy(() => import(/* webpackChunkName: "page-dashboard" */'../pages/dashboard/dashboard'))


export function MainRouter({store}) {
    const [global,setGlobal] = useState(store.getState())
    const [path,setPath] = useState({login: global.login?'/login':'*'})
    const [auth,setAuth] = useState(localStorage.getItem('data-auth'))

    useEffect(() => {
        const id = store.subscribe(() => setGlobal(store.getState()))
        return () => id.unsubscribe()
    },[])

    useEffect(() => {
        if(global.login) setPath({login: '/login'})
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
                <Route exact strict path="/import" component={PageImport} />
                <Route path={['/dashboard','/dashboard/*']} component={PageDashboard} />
                <Route exact strict path="*" component={Loading} />
            </Switch>
            </Suspense>
        </Router>
        </Provider>
    )
}