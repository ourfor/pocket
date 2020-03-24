import { Divider, Tag, Radio, Icon } from 'antd'

const DEVICE_STATUS = [
  {text: '申请', color: 'blue'},
  {text: '启用', color: 'green'},
  {text: '禁用', color: 'red'}
]

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
    dataIndex: 'exception',
    key: 'exception',
    render: exception => 
    <Tag color={DEVICE_STATUS[1].color}>{DEVICE_STATUS[1].text}</Tag>
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