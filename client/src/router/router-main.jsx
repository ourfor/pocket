import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/loading/loading'

// lazy import, optimization
const PageLogin = lazy(() => import('../pages/login/login'))

function MainRouter({global, dispatch}) {
    const [loginPath,setLoginPath] = useState(global.isLogin?'/login':'*')

    useState(() => {
        if(global.isLogin) setLoginPath('/login')
        else setLoginPath('*')
        log(global)
    },[global])

    return (
        <Router>
            <Suspense fallback={<Loading />} >
            <Switch>
                <Route path={loginPath} component={PageLogin} />
                <Route exact strict path="/" component={Loading} />
            </Switch>
            </Suspense>
        </Router>
    )
}

export default connect(
    (state) => ({global: state}),
    (dispatch) => ({dispatch})
)(MainRouter)