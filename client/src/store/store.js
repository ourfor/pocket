import { createStore } from 'redux'

function Data(state = checkLogin(),{ type, ...data }) {
    switch(type) {
        case "update": 
            return data
        case "home": 
            return { ...state, home: data.home}
        case "todo": 
            const { todo } = data
            return { ...state, todo}
        case "theme": 
            const { theme } = data
            return { ...state, theme}
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