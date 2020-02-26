import { createStore } from 'redux'

const db = {
    login: false,
    theme: 'simple',
    setting: null
}

function Data(state = db, { type, ...rest }) {
    switch(type) {
        case 'login': {
            const { login } = rest
            return { ...state, login }
        }
        case 'setting': {
            const { setting } = rest
            return { ...state, setting }
        }
        case 'theme': {
            const { theme } = rest
            return { ...state, theme }
        }
        default: {
            return state
        }
    }
}

export const store = createStore(Data)