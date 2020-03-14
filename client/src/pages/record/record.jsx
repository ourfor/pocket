import axios from "axios"
import { useState, useEffect } from "react"
import { Cascader, Button, Icon, Empty } from "antd"
import { Container } from "./style"
import { RecordList } from "./table"
import { connect } from "../../store/connect"
import { GoBack } from "../../components/menu-bar/menu-bar"
import { saveCSV } from "../../tools/download"
import { Expand } from "./appeal"

export function PageRecord({ global }) {
  const [options, setOptions] = useState([])
  const [param, setParam] = useState([])
  const [data, setData] = useState(null)
  const [toExcel, setToExcel] = useState(null)
  const [lessons,setLessons] = useState([])
  const { theme } = global

  const search = () => {
    const query = param.join("");
    load(query);
  }

  const load = query => {
    axios
      .get(`${$conf.api.host}/record/search?${query}`)
      .then(({ data: { data, code } }) => {
        if (code === 200) {
          const { records, students } = data;
          const result = records.map(record => ({
            ...record,
            stuName: students[record.stuID]
          }))
          setData(<RecordList dataSource={result} />);
          if (global.data.role === "teacher") setToExcel(result);
        }
      });
  }

  useEffect(() => {
    const query = location.search;
    if (/lessonId=.*&term=.*&beginTime=.*/.test(query)) {
      load(query.substr(1))
    }

    const role = global.data.role === "student" ? "stuId" : "teachId";
    axios
      .get(`${$conf.api.host}/record/time?${role}=${global.data.user}`)
      .then(({ data: { data, code } }) => {
        if (code === 200) {
          const deal = global.data.role === "student" ? student : teacher;
          deal(data)
        }
      })

    function teacher(data) {
      const lessons = {}
      const options = data.map(({ lesson, time_range }) => {
        const { lessonID, term, lessonName } = lesson;
        lessons[lessonID+term] = lessonName;
        return {
          value: `lessonId=${lessonID}&term=${term}`,
          label: `${lessonID} - ${lessonName}`,
          children: time_range.map(v => ({
            value: `&beginTime=${v}`,
            label: v
          }))
        };
      });
      setOptions(options)
      setLessons(lessons)
    }

    function student({ lessons, rooms, records }) {
      const lessonMap = {}
      const roomMap = {}
      lessons.forEach(
        ({ lessonID, term, lessonName }) =>
          (lessonMap[lessonID + term] = lessonName)
      )
      rooms.forEach(
        ({ roomID, roomName, building }) =>
          (roomMap[roomID] = { roomName, building })
      )
      const { nickname: stuName } = global.data;
      const source = records.map(record => {
        const { lessonID, term, roomID } = record;
        const { building, roomName } = roomMap[roomID];
        const place = `${building}-${roomName}`;
        return {
          ...record,
          lessonName: lessonMap[lessonID + term],
          place,
          stuName
        }
      })

      setData(
        <RecordList
          bordered
          role="student"
          dataSource={source}
          expand={Expand}
        />
      )
    }
  }, [])

  const data2xsl = (format, data) => {
    const { createTime: filename, lessonID, term } = data[0];
    const tag = [null,'正常','迟到','旷课']
    const lessonName = lessons[lessonID+term]

    const buffer = data.map(v => {
      const {recID,createTime,stuID,svrID,siteNo,roomID,lessonID,
             term,beginTime,endTime,attendTag,leaveEarly,refreshTime,
             phoneIn,isOver,mac,btexception,stuName} = v 
      return [
        stuID,stuName,recID,createTime,lessonName,
        lessonID,term,beginTime,endTime,
        `[${siteNo}]`,tag[attendTag],leaveEarly,refreshTime,phoneIn,
        isOver,mac,btexception
      ]
    })

    buffer.unshift(
      ['学号','姓名','记录ID','记录创建时间','课程名','课程号','开课学期',
       '上课时间','下课时间','座位号','出勤状态','是否早退','记录刷新时间',
       '座位号','手机入袋','考勤完结','蓝牙地址','蓝牙异常'])

    saveCSV(filename,buffer.join('\n'))
    log(data)
  };

  return (
    <Container theme={theme} role={global.data.role}>
      <div className="header-bar">
        <GoBack />
        <h3> 历史考勤记录📝</h3>
        <Cascader
          className="select-record"
          options={options}
          onChange={setParam}
          placeholder="Please select"
        />
        <Button type="primary" className="search-record" onClick={search}>
          <Icon type="search" /> 查询考勤
        </Button>
      </div>
      <div className="content-wrap">
        <div className="content" role={global.data.role}>
          {data ? data : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
      </div>
      {toExcel ? (
        <Button onClick={() => data2xsl(null, toExcel)} className="to-excel">
          <Icon type="cloud-download" /> 导出Excel文件
        </Button>
      ) : null}
    </Container>
  )
}

export default connect(PageRecord)
