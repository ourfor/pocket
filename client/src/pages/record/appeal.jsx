import { Modal, Button, Tag, message } from 'antd'
import { attendTag as status, color } from './table'

const { confirm } = Modal

export function showConfirm(data) {
  confirm({
    title: '你确定要对该考勤记录📝申诉吗?',
    content: <Content data={data} />,
    onOk() {
        const { stuID, lessonID, term, beginTime, endTime, roomID } = data
        const req = { stuID, lessonID, term, beginTime, endTime, roomID }
        log(req)
        message.success('成功提交申诉请求 👌')
    },
    onCancel() {
    },
  });
}

export function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export function showPropsConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function Content({data}) {
    const { lessonID, lessonName, place, siteNo, 
        beginTime, endTime, roomID, term, attendTag: tag } = data
    return (
        <div style={{lineHeight: 2.5}}>
        <Tag color="black">{lessonName}</Tag> 
        (课程号: {lessonID}, 开课学期: {term}), 
        上课时间为: <Tag color={color[1]}>{beginTime}</Tag>, 
        下课时间为: <Tag color={color[2]}>{endTime}</Tag> 
        在<Tag color="blue">{place}</Tag>上课, 
        座位号为: <Tag color="#df115e">{siteNo}</Tag>
        您出勤状态为: <Tag color={color[tag]}>{status[tag]}</Tag>
        </div>
    )
}

export function Expand(data) {
    const { beginTime, endTime, place } = data
    return (
        <p>
        上课时间为: <Tag color={color[1]}>{beginTime}</Tag>,  
        下课时间为: <Tag color={color[2]}>{endTime}</Tag> 
        在 <Tag color="blue">{place}</Tag> 上课, 
        如果你对该考勤记录📝结果有异议? 点此 <Button onClick={() => showConfirm(data)} size="small" type="danger">申诉</Button>
        </p>
    )
}