import { createStore } from 'redux'

function loginState(state = checkLogin(),{ type, ...data }) {
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
    const result = auth ? { isLogin: true, data: JSON.parse(auth)} : { isLogin: false }
    return result
}

const authStore = createStore(loginState)

export { 
    authStore
}