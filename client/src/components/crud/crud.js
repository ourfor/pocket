import { create } from './create'
import { remove } from './remove'
import { update } from './update'
import { Tag, Icon } from 'antd'

const RemoveButton = ({onClick}) => <Tag color="pink" style={{cursor: 'pointer'}} onClick={onClick}><Icon type="delete" /> 删除</Tag>
const UpdateButton = ({onClick}) => <Tag color="blue" style={{cursor: 'pointer'}} onClick={onClick}><Icon type="edit" /> 编辑</Tag>

export { create, remove, update, RemoveButton, UpdateButton }