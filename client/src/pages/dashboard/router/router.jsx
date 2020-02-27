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
const PageHome = lazy(() => import(/* webpackChunkName: "dashboard-home" */'../home/home'))

export const Root = ({store}) => {
    const [path,setPath] = useState(store.getState().login?{login:['/dashboard/login']}:PATH)
    useEffect(() => {
        const subscription = store.subscribe(() => {
            if(store.getState().login) setPath({...path,login: ['/dashboard/login']})
        })
        return () => subscription.unsubscribe()
    },[])
    log(path)
    return (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<Loading />}>
            <Switch>
                <Route strict path={path['login']} component={PageLogin} />
                <Route strict path="/dashboard" component={PageHome} />
                <Route exact strict path="/dashboard/setting" component={PageSetting} />
                <Route exact strict path="/dashboard/device" component={PageDevice} />
            </Switch>
            </Suspense>
        </Router>
    </Provider>
    )
}

