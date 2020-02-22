import { MainContainer } from '../../components/layout/layout'
import { connect } from '../../store/connect'
import MenuBar from '../../components/menu-bar/menu-bar'
import Student from './student'
import Teacher from './teacher'
import { Style } from './style'

export function PageMine({global}) {
    const { data: user } = global
    const Content = user.role==="student"?Student:Teacher

    return (
        <MainContainer width={800} height="74%" minHeight="74%">
            <MenuBar className="headerbar-menu"/>
            <Style>
                <Content user={user} />
            </Style>
        </MainContainer>
    )
}

export default connect(PageMine)