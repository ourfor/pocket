import axios from 'axios'
import { useState, useEffect } from 'react'
import { Cascader, Button, Icon, Empty } from 'antd'
import { MainContainer } from './style'
import { RecordList } from './table'
import { GoBack } from '../../components/menu-bar/menu-bar'

export default function PageRecord({global}) {
    const [options,setOptions] = useState([])
    const [param,setParam] = useState([])
    const [data,setData] = useState(null)

    const search = () => {
        const query = param.join('')
        load(query)
    }

    const load = (query) => {
        axios.get(`${$conf.api.host}/record/search?${query}`)
            .then(({data: {data,code}}) => {
                if(code === 200) {
                    const { records, students } = data
                    const result = records.map((record) => 
                    ({...record, stuName: students[record.stuID]}))
                    setData(<RecordList dataSource={result} />)
                }
            })        
    }

    useEffect(() => {
        const query = location.search
        if(/lessonId=.*&term=.*&beginTime=.*/.test(query)) {
            load(query.substr(1))
        }
        axios.get(`${$conf.api.host}/record/time?teachId=${global.data.user}`)
            .then(({data: {data,code}}) => {
                if(code===200) {
                    const options = data.map(({lesson,time_range}) => {
                        const { lessonID, term, lessonName } = lesson
                        return {
                            value: `lessonId=${lessonID}&term=${term}`,
                            label: `${lessonID} - ${lessonName}`,
                            children: time_range.map(v => ({value: `&beginTime=${v}`, label: v}))
                        }
                    })
                    setOptions(options)
                }
            })
    },[])

    return (
        <MainContainer>
            <div className="header-bar">
                <GoBack /> 
                <h3> 历史考勤记录📝</h3>
                <Cascader className="select-record" options={options} onChange={setParam} placeholder="Please select" />
                <Button type="primary" className="search-record" onClick={search}><Icon type="search" /> 查询考勤</Button>
            </div>
            <div className="content">
                {data ? data : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </MainContainer>
    )
}

