import { Divider, Tag, Radio, Icon } from 'antd'

export const columns = [
  {
    title: '学号',
    dataIndex: 'stuID',
    key: 'stuID',
    render: id => <a>{id}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'stuName',
    key: 'stuName',
    render: name => <Tag color="gray">{name}</Tag>
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: sex => 
    <Tag color={sex?'orange':'pink'}>
        <Icon type={sex?'man':'woman'} />{sex?' 男':' 女'}
    </Tag>
  },
  {
    title: '班级',
    dataIndex: 'classID',
    key: 'classID',
    render: no => (
      <span>
        <Tag color="red" key={no} >
            {no}
        </Tag>
      </span>
    ),
  },
  {
    title: '座位号',
    dataIndex: 'siteNo',
    key: 'siteNo',
    render: no => <Tag color="black">{no}</Tag>
  },
  {
    title: '蓝牙地址',
    dataIndex: 'MAC',
    key: 'MAC',
    render: mac => 
    <Tag color='blue'>{mac}</Tag>
  },
  {
    title: '',
    dataIndex: 'stuID',
    width: 102,
    key: 'op-update',
    align: 'center',
    render: null
  },
  {
    title: '',
    dataIndex: 'stuID',
    width: 102,
    key: 'op-delete',
    align: 'center',
    render: null
  }
]