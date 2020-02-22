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
        default: 
            return state
    }
}

function checkLogin() {
    const auth = localStorage.getItem('data-auth')
    // skip checking valid json
    const result = auth ? { login: true, data: JSON.parse(auth)} : { login: false }
    return result
}

export const store = createStore(Data)