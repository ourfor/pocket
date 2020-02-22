import { Icon, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { Style } from './style'

export default function MenuBar({className="headerbar-menu",menus}) {
    menus = menus ? menus : ['home','mine','history','import','about','setting']
    
    const history = useHistory()
    const go = (path) => {
        history.push(path)
    }
    const logout = () => {
        localStorage.removeItem('data-auth')
        window.open('/','_self')
    }

    const content = menus.map((key) => {
        const { title, path, icon } = items[key]
        return (
        <Tooltip title={title} key={title} onClick={() => go(path)}>
            <Icon type={icon} theme="filled" />
        </Tooltip>
        )
    })

    return (
        <Style className={`${className}`}>
            { content }
            <Tooltip title="退出登录" onClick={logout}><Icon type="close-circle" theme="filled" /></Tooltip>
        </Style>
    )
}

export function GoBack() {
    const history = useHistory()
    return <Tooltip title="返回主页" onClick={() => history.push('/')}><Icon type="close-circle" theme="filled" /></Tooltip>
}

const items = {
    home : {
        title: '主页',
        path: '/',
        icon: 'home'
    },
    mine: {
        title: '资料',
        path: '/mine',
        icon: 'idcard'
    },
    history: {
        title: '考勤历史',
        path: '/record',
        icon: 'fund'
    },
    import: {
        title: '导入课表',
        path: '/import',
        icon: 'file-excel'
    },
    about: {
        title: '关于',
        path: '/about',
        icon: 'info-circle'
    },
    setting: {
        title: '设置',
        path: '/setting',
        icon: 'setting'
    }
}