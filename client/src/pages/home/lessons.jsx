import { Table, Divider, Tag } from 'antd'
import { useEffect } from 'react'

export const columns = [
  {
    title: '课程名',
    dataIndex: 'lessonName',
    key: 'lessonName',
    render: text => <a>{text}</a>,
  },
  {
    title: '课程ID',
    dataIndex: 'lessonID',
    key: 'lessonID',
  },
  {
    title: '开课学期',
    dataIndex: 'term',
    key: 'term',
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
];

export function Lessons({dataSource}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={columns} dataSource={data} />
}