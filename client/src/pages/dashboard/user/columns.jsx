import { Divider, Tag, Radio, Icon } from 'antd'

export const columns = [
  {
    title: '用户ID',
    dataIndex: 'userID',
    key: 'userID',
    render: id => <a>{id}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    render: name => <Tag color="blue">{name}</Tag>
  },
  {
    title: '',
    dataIndex: 'userID',
    width: 102,
    key: 'op-update',
    align: 'center',
    render: null
  },
  {
    title: '',
    dataIndex: 'userID',
    width: 102,
    key: 'op-delete',
    align: 'center',
    render: null
  }
]