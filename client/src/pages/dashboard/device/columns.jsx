import { Divider, Tag, Radio, Icon } from 'antd'

const DEVICE_STATUS = {
  '申请': 'blue',
  '启用': 'green',
  '禁用': 'red'
}

export const columns = [
  {
    title: '设备ID',
    dataIndex: 'svrID',
    key: 'svrID',
    render: text => <a>{text}</a>,
  },
  {
    title: '设备标识符',
    dataIndex: 'svrCode',
    key: 'svrCode',
    render: code => <Tag color="gold">{code}</Tag>
  },
  {
    title: '设备密钥',
    dataIndex: 'svrKey',
    key: 'svrKey',
    render: key => (
      <span>
        <Tag color={'red'/*#df115e*/} key={key} >
            {key}
        </Tag>
      </span>
    ),
  },
  {
    title: '教室',
    dataIndex: 'roomName',
    align: 'center',
    key: 'roomName'
  },
  {
    title: '版本号',
    dataIndex: 'version',
    align: 'center',
    key: 'version'
  },
  {
    title: '设备状态',
    dataIndex: 'state',
    key: 'state',
    render: state => 
    <Tag color={DEVICE_STATUS[state]?DEVICE_STATUS[state]:'red'}>{state?state:'禁用'}</Tag>
  },
  {
    title: '网络状态',
    key: 'online',
    align: 'center',
    dataIndex: 'online',
    render: online => (
      <span>
        <Tag color={online?'green':'red'}>
           {online?'在线':'掉线'}
        </Tag>
      </span>
    ),
  },
  {
    title: '',
    dataIndex: 'svrID',
    width: 102,
    key: 'op-update',
    align: 'center',
    render: null
  },
  {
    title: '',
    dataIndex: 'svrID',
    width: 102,
    key: 'op-delete',
    align: 'center',
    render: null
  }
]