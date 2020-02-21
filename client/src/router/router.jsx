import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/loading/loading'

// lazy import, optimization
const PageLogin = lazy(() => import('../pages/login/login'))
const PageHome = lazy(() => import('../pages/home/home'))
const PageRecord = lazy(() => import('../pages/record/record'))
const PageMine = lazy(() => import('../pages/mine/mine'))

function MainRouter({global, dispatch}) {
    const [loginPath,setLoginPath] = useState(global.isLogin?'/login':'*')
    const [auth,setAuth] = useState(localStorage.getItem('data-auth'))

    useEffect(() => {
        if(global.isLogin) setLoginPath('/login')
        else setLoginPath('*')
    },[global])

    return (
        <Router>
            <Suspense fallback={<Loading />} >
            <Switch>
                <Route path={loginPath} component={() => <PageLogin dispatch={dispatch} />} />
                <Route exact strict path={['/','/home']} component={() => <PageHome global={global} dispatch={dispatch} />} />
                <Route exact strict path="/record" component={() => <PageRecord global={global} />} />
                <Route exact strict path="/mine" component={() => <PageMine global={global} />} />
            </Switch>
            </Suspense>
        </Router>
    )
}

export default connect(
    (state) => ({global: state}),
    (dispatch) => ({dispatch})
)(MainRouter)