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

export const Root = ({store}) => {
    const [path,setPath] = useState({login:store.getState().login?['/dashboard/login']:PATH})
    useEffect(() => {
        const subscription = store.subscribe(() => {
            if(store.getState().login) setPath({...path,login: ['/dashboard/login']})
        })
        return () => subscription.unsubscribe()
    },[])
    return (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact strict path={path['login']} component={PageLogin} />
                <Route exact strict path="/dashboard/setting" component={PageSetting} />
            </Switch>
            </Suspense>
        </Router>
    </Provider>
    )
}

