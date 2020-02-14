import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './sass/main.scss'

import MainRouter from './router/router-main'
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