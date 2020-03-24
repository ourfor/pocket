import { Divider, Tag, Radio, Icon } from 'antd'

export const columns = [
  {
    title: '教室ID',
    dataIndex: 'roomID',
    key: 'roomID',
    render: id => <a>{id}</a>,
  },
  {
    title: '教室',
    dataIndex: 'roomName',
    key: 'roomName',
    render: name => <Tag color="gray">{name}</Tag>
  },
  {
    title: '所在建筑🏠',
    dataIndex: 'building',
    key: 'building',
    render: building => 
    <Tag color="orange">{building}</Tag>
  },
  {
    title: '座位个数',
    dataIndex: 'siteCount',
    key: 'siteCount',
    render: no => (
      <span>
        <Tag color="green" key={no} >
            {no}
        </Tag>
      </span>
    ),
  },
  {
    title: '',
    dataIndex: 'roomID',
    width: 102,
    key: 'op-update',
    align: 'center',
    render: null
  },
  {
    title: '',
    dataIndex: 'roomID',
    width: 102,
    key: 'op-delete',
    align: 'center',
    render: null
  }
]