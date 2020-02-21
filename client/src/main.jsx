import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './sass/main.scss'

// i18n
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import MainRouter from './router/router'
import { copyright } from './components/copyright/copyright'

import { authStore } from './store/auth'

function App() {
    copyright()
    return (
        <Provider store={authStore}>
            <MainRouter />
        </Provider>
    )
}

render(<App />, document.getElementById('main'))