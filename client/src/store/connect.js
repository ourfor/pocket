import { connect as connector } from 'react-redux'

export default function connect(component) {
    return connector(
        (state) => ({global: state}),
        (dispatch) => ({dispatch})
    )(component)
}

export { connect }