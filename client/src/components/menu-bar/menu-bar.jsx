import { Icon, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'

export default function MenuBar({className}) {
    const history = useHistory()
    const go = (path) => {
        history.push(path)
    }
    return (
        <div className={`${className}`}>
            <Tooltip title="主页" onClick={() => go('/')}><Icon type="home" theme="filled" /></Tooltip>
            <Tooltip title="资料" onClick={() => go('/mine')}><Icon type="idcard" theme="filled" /></Tooltip>
            <Tooltip title="考勤历史" onClick={() => go('/record')}><Icon type="fund" theme="filled" /></Tooltip>
            <Tooltip title="导入课表" onClick={() => go('/import')}><Icon type="file-excel" theme="filled" /></Tooltip>
            <Tooltip title="关于" onClick={() => go('/about')}><Icon type="info-circle" theme="filled" /></Tooltip>
            <Tooltip title="偏好设置" onClick={() => go('/setting')}><Icon type="setting" theme="filled" /></Tooltip>
        </div>
    )
}