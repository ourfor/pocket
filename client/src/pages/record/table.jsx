import { Table, Divider, Tag, Radio } from 'antd'

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
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: endTime => (
      <span>
        <Tag color={'violet'} key={endTime}>
           {endTime}
        </Tag>
      </span>
    ),
  },
  {
    title: '开始时间',
    key: 'beginTime',
    dataIndex: 'beginTime',
    render: beginTime => (
      <span>
        <Tag color={'red'} key={beginTime}>
           {beginTime}
        </Tag>
      </span>
    ),
  },
  {
    title: '结束时间',
    key: 'endTime',
    dataIndex: 'endTime',
    render: endTime => (
      <span>
        <Tag color={'green'} key={endTime}>
           {endTime}
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
  }
];

export function RecordList({dataSource}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={columns} dataSource={data} />
}