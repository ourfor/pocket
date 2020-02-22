import { createStore } from 'redux'

function data(state = {home: '首页',login: '登录'},{ type, ...rest }) {
    switch(type) {
        case 'home': 
            return {state, home: rest.home}
        case 'login': 
            return { state, login: rest.login}
        default:
            return state
    }
}

export const store = createStore(data)