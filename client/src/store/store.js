import { createStore } from 'redux'

function Data(state = init(),{type, ...rest}) {
    switch(type) {
        case "login": {
            const { login, data } = rest
            const result = { ...state, login, data}
            localStorage.setItem('data-auth',JSON.stringify({...state.data,...data}))
            return result
        }
        case "home": {
            const { home } = rest
            return { ...state, home}
        }
        case "todo": {
            const { todo } = rest
            return { ...state, todo}
        }
        case "theme": {
            const { theme } = rest
            return { ...state, theme}
        }
        case "dashboard": {
            const { dashboard } = rest
            localStorage.setItem('data-auth',JSON.stringify(data))
            log({...state,dashboard})
            return { ...state, dashboard}
        }
        case "user": {
            const { user } = rest
            const data = { ...state.data, ...user}
            localStorage.setItem('data-auth',JSON.stringify(data))
            return { ...state, data}
        }
        default: 
            return state
    }
}

function init() {
    const now = new Date()
    const night = new Date(now.toLocaleDateString() + " 18:00:00")
    const theme = now.getTime() >= night.getTime() ? $conf.theme[0]: $conf.theme[1]
    const auth = localStorage.getItem('data-auth')
    // skip checking valid json
    const result = auth ? 
        { version: '20200317', owner: 'everyone', theme , login: true, data: JSON.parse(auth)} : 
        { version: '20200317', owner: 'everyone', theme, login: false }
    return result
}

export const store = createStore(Data)