import { Table, Divider, Tag, Radio } from 'antd'

export const ColumnsDevice = [
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
    title: '教室ID',
    dataIndex: 'roomID',
    key: 'roomID'
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version'
  },
  {
    title: '设备状态',
    dataIndex: 'exception',
    key: 'exception',
    render: exception => 
    <Tag color={exception?'red':'blue'}>{exception?'异常':'正常'}</Tag>
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
  }
];

export function DeviceList({dataSource, ...rest}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={ColumnsDevice} dataSource={data} {...rest} />
}