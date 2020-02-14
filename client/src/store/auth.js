import { createStore } from 'redux'

function loginState(state = checkLogin(),{ type, ...data }) {
    let result = null
    switch(type) {
        case "update": {
            result = data
        }
        default: {
            result = state
        }
    } 
    return result
}

function checkLogin() {
    const auth = localStorage.getItem('data-auth')
    // skip checking valid json
    const result = auth ? { isLogin: true, ...JSON.parse()} : { isLogin: false }
    return result
}

const authStore = createStore(loginState)

export { 
    authStore
}