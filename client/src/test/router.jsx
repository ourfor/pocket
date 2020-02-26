import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useTime } from '../hook/useTime'

export const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route exact strict path="/" component={HomePage} />
            <Route exact strict path="/login" component={Login} />
            <Route exact strict path="/greeting" component={Greeting} />
        </Router>
    </Provider>
)

const HomePage = connect(
    (state) => ({data: state}),
    (dispatch) => ({dispatch})
)(Home)

function Home(props) {
    const time = useTime()
    return <p> time: {time} this is home<Link to="/login">Login</Link> <Link to="/greeting">Greeting</Link></p>
}

const Login = (props) => {
    log(props)
    return <p>this is login </p>
}

const Greeting = (props) => {
    log(props)
    return <p>this is greeting</p>
}