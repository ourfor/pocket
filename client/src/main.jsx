import { render } from 'react-dom'
import './sass/main.scss'

// i18n
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { MainRouter } from './router/router'
import { copyright } from './components/copyright/copyright'
import { store } from './store/store'

function App() {
    copyright()
    return (
        <MainRouter store={store} />
    )
}

render(<App />, document.getElementById('main'))