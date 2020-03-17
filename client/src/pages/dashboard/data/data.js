import { createStore } from 'redux'

const db = {
    owner: 'admin',
    version: '20200317',
    login: false,
    theme: 'simple',
    setting: null
}

function Data(state = init(), { type, ...rest }) {
    let result = null
    switch(type) {
        case 'login': {
            const { user } = rest
            result = { ...state, login: true, user }
            break
        }
        case 'setting': {
            const { setting } = rest
            result = { ...state, setting }
            break
        }
        case 'theme': {
            const { theme } = rest
            result = { ...state, theme }
            break
        }
        case 'student': {
            const { student } = rest
            result = { ...state, student }
            break
        }
        default: {
            result = state
            break
        }
    }

    localStorage.setItem('data-system',JSON.stringify(result))
    return result
}

function init() {
    let result = db
    const data = localStorage.getItem('data-system')
    if(data) {
        try {
            result = JSON.parse(data)
        } catch (error) {
            localStorage.removeItem('data-system')
        }
    }
    return result
}

export const store = createStore(Data)