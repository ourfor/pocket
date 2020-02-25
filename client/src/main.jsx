import { render } from 'react-dom'
import './sass/main.scss'

// i18n
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { MainRouter } from './router/router'
import { copyright } from './components/copyright/copyright'
import { store } from './store/store'

function App() {
    copyright()
    return (
        <ConfigProvider locale={zhCN}>
            <MainRouter store={store} />
        </ConfigProvider>
    )
}

render(<App />, document.getElementById('main'))