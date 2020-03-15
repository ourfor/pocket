import { Table, Divider, Tag, Radio, Icon } from 'antd'

export const ColumnsDevice = [
  {
    title: '教师号',
    dataIndex: 'teachID',
    key: 'teachID',
    render: id => <a>{id}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'teachName',
    key: 'teachName',
    render: name => <Tag color="blue">{name}</Tag>
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    align: 'center',
    render: sex => 
    <Tag color={sex?'orange':'pink'}>
        <Icon type={sex?'man':'woman'} />{sex?' 男':' 女'}
    </Tag>
  }
];

export function TeacherList({dataSource, ...rest}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <Table columns={ColumnsDevice} dataSource={data} {...rest} />
}