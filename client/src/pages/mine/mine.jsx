import { MainContainer, Span } from '../../components/layout/layout'
import { connect } from '../../store/connect'
import { MenuBar, GoBack } from '../../components/menu-bar/menu-bar'
import Student from './student'
import Teacher from './teacher'
import { Style } from './style'

export function PageMine({global,dispatch}) {
    const { data: user } = global
    const isTeacher = user.role==="teacher"
    const Content = isTeacher?Teacher:Student
    const menus = isTeacher? null : ['home','mine','history','setting']
    function update(user) {
        dispatch({type: 'user', user})
    }

    return (
        <MainContainer width={800} height="74%" minHeight="74%">
            <Span>
                <GoBack />
                <MenuBar className="headerbar-menu" menus={menus}/>
            </Span>
            <Style>
                <Content user={user} update={update}/>
            </Style>
        </MainContainer>
    )
}

export default connect(PageMine)