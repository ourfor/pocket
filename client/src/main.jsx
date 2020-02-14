import { render } from 'react-dom'

// lazy load route page
import PageLogin from './pages/login/login'


// import style sheet
import './sass/main.scss'

log('load successful')

function App() {
    return (
        <div style={{height: '100%'}}>
            <PageLogin />
        </div>
    )
}

render(<App />, document.getElementById('main'))