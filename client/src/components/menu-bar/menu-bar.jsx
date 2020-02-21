import { Icon, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { Style } from './style'

export default function MenuBar({className="headerbar-menu"}) {
    const history = useHistory()
    const go = (path) => {
        history.push(path)
    }
    const logout = () => {
        localStorage.removeItem('data-auth')
        window.open('/','_self')
    }
    return (
        <Style className={`${className}`}>
            <Tooltip title="主页" onClick={() => go('/')}><Icon type="home" theme="filled" /></Tooltip>
            <Tooltip title="资料" onClick={() => go('/mine')}><Icon type="idcard" theme="filled" /></Tooltip>
            <Tooltip title="考勤历史" onClick={() => go('/record')}><Icon type="fund" theme="filled" /></Tooltip>
            <Tooltip title="导入课表" onClick={() => go('/import')}><Icon type="file-excel" theme="filled" /></Tooltip>
            <Tooltip title="关于" onClick={() => go('/about')}><Icon type="info-circle" theme="filled" /></Tooltip>
            <Tooltip title="偏好设置" onClick={() => go('/setting')}><Icon type="setting" theme="filled" /></Tooltip>
            <Tooltip title="退出登录" onClick={logout}><Icon type="close-circle" theme="filled" /></Tooltip>
        </Style>
    )
}

export function GoBack() {
    const history = useHistory()
    return <Tooltip title="返回主页" onClick={() => history.push('/')}><Icon type="close-circle" theme="filled" /></Tooltip>
}