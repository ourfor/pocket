import { createStore } from 'redux'

function Data(state = checkLogin(),{type, ...rest}) {
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

function checkLogin() {
    const now = new Date()
    const night = new Date(now.toLocaleDateString() + " 18:00:00")
    const theme = now.getTime() >= night.getTime() ? 'night':'light'
    const auth = localStorage.getItem('data-auth')
    // skip checking valid json
    const result = auth ? { theme , login: true, data: JSON.parse(auth)} : { theme, login: false }
    return result
}

export const store = createStore(Data)