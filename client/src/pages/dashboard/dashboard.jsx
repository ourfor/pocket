import { MainContainer } from '../../components/layout/layout'
import { connect } from '../../store/connect'
import { store } from './data/data'
import { Root } from './router/router'

export function DashboardPage({global,dispatch}) {
    return (
        <MainContainer theme={global.theme}>
            <Root store={store} />
        </MainContainer>
    )
}

export default connect(DashboardPage)