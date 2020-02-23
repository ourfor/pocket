import { MainContainer } from '../../components/layout/layout'
import { connect } from '../../store/connect'
import MenuBar from '../../components/menu-bar/menu-bar'
import Student from './student'
import Teacher from './teacher'
import { Style } from './style'

export function PageMine({global}) {
    const { data: user } = global
    const isTeacher = user.role==="teacher"
    const Content = isTeacher?Teacher:Student
    const menus = isTeacher? null : ['home','mine','history','setting']

    return (
        <MainContainer width={800} height="74%" minHeight="74%">
            <MenuBar className="headerbar-menu" menus={menus}/>
            <Style>
                <Content user={user} />
            </Style>
        </MainContainer>
    )
}

export default connect(PageMine)