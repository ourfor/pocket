import { Table, Divider, Tag, Icon } from 'antd'
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
  {
    title: '',
    dataIndex: 'id',
    width: 102,
    key: 'op-update',
    align: 'center',
    render: null
  },
  {
    title: '',
    dataIndex: 'id',
    width: 102,
    key: 'op-delete',
    align: 'center',
    render: null
  }
];

export function Lessons({dataSource,update=null,remove=null}) {
    const cols = [...columns]
    const len = columns.length - 1
    if(update===null||remove===null) {
      delete cols[len]
      delete cols[len-1]
    } else {
      cols[len-1].render = update
      cols[len].render = remove
    }
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={cols} dataSource={data} />
}