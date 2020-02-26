import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import Loading from '../../../components/loading/loading'

// lazy load
const PageLogin = lazy(() => import(/* webpackChunkName: "dashboard-login" */'../login/login'))
const PageSetting = lazy(() => import(/* webpackChunkName: "dashboard-setting" */'../setting/setting'))

export const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact strict path="/dashboard/login" component={PageLogin} />
                <Route exact strict path="/dashboard/setting" component={PageSetting} />
                <Route path={['/dashboard','/dashboard/*']} component={PageLogin} />
            </Switch>
            </Suspense>
        </Router>
    </Provider>
)

