import { Table, Divider, Tag, Radio } from 'antd'
const color = ['white','green','gold','red']
const attendTag = ['无','正常','迟到','旷课']

export const columns = [
  {
    title: '记录ID',
    dataIndex: 'recID',
    key: 'recID',
    render: text => <a>{text}</a>,
  },
  {
    title: '学生ID',
    dataIndex: 'stuID',
    key: 'stuID',
  },
  {
    title: '姓名',
    dataIndex: 'stuName',
    key: 'stuName'
  },
  {
    title: '座位号',
    key: 'siteNo',
    dataIndex: 'siteNo',
    render: siteNo => (
      <span>
        <Tag color={'#df115e'} key={siteNo}>
           {siteNo}
        </Tag>
      </span>
    ),
  },
  {
      title: '早退',
      key: 'leaveEarly',
      dataIndex: 'leaveEarly',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '手机是否入袋',
      key: 'phoneIn',
      dataIndex: 'phoneIn',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '考勤完结',
      key: 'isOver',
      dataIndex: 'isOver',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '蓝牙异常',
      key: 'BTException',
      dataIndex: 'BTException',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
    title: '刷新时间',
    dataIndex: 'refreshTime',
    key: 'refreshTime',
    render: refreshTime => (
      <span>
        <Tag color={'red'/*#df115e*/} key={refreshTime} className={refreshTime?'show':'hidden'}>
           {refreshTime?refreshTime:'yyyy-MM-dd HH:mm:ss'}
        </Tag>
      </span>
    ),
  },
  {
    title: '出勤状态',
    key: 'attendTag',
    dataIndex: 'attendTag',
    render: tag => (
      <span>
        <Tag color={color[tag]} key={tag} className={tag?'show':'hidden'}>
           {tag?attendTag[tag]:'未知'}
        </Tag>
      </span>
    ),
  }
];

export function RecordList({dataSource}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={columns} dataSource={data} />
}