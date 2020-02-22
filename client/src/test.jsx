import { render } from 'react-dom'
import './sass/test.scss'
import { store } from './test/store'
import { Root } from './test/router'



function App() {
    return (
        <Root store={store} />
    )
}

render(<App />, document.getElementById('main'))