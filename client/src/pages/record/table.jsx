import { Table, Divider, Tag, Radio } from 'antd'
export const color = ['white','green','gold','red']
export const attendTag = ['无','正常','迟到','旷课']

export const ColumnsTeacher = [
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
      align: 'center',
      dataIndex: 'leaveEarly',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '手机是否入袋',
      key: 'phoneIn',
      align: 'center',
      dataIndex: 'phoneIn',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '考勤完结',
      key: 'isOver',
      align: 'center',
      dataIndex: 'isOver',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '蓝牙异常',
      key: 'BTException',
      align: 'center',
      dataIndex: 'btexception',
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

export const ColumnsStudent = [
  {
    title: '记录ID',
    dataIndex: 'recID',
    key: 'recID',
    render: text => <a>{text}</a>,
  },
  {
    title: '课程名',
    dataIndex: 'lessonName',
    key: 'lessonName',
  },
  {
    title: '开课学期',
    dataIndex: 'term',
    key: 'term'
  },
  {
    title: '地点',
    key: 'place',
    dataIndex: 'place',
    render: place => (
      <span>
        <Tag color={'green'} key={place}>
           {place}
        </Tag>
      </span>      
    )
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
      align: 'center',
      dataIndex: 'leaveEarly',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '手机是否入袋',
      key: 'phoneIn',
      align: 'center',
      dataIndex: 'phoneIn',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '考勤完结',
      key: 'isOver',
      align: 'center',
      dataIndex: 'isOver',
      render: data => <Radio defaultChecked={data} disabled />
  },
  {
      title: '蓝牙异常',
      key: 'BTException',
      align: 'center',
      dataIndex: 'btexception',
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
    align: 'center',
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

export function RecordList({dataSource,expand,role="teacher",...rest}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={role==="teacher"?ColumnsTeacher:ColumnsStudent} 
              dataSource={data} expandedRowRender={expand} {...rest} />
}