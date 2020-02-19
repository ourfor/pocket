import axios from 'axios'
import { useState, useEffect } from 'react'
import { Cascader, Button, Icon } from 'antd'
import { MainContainer } from './style'
import { RecordList } from './table'

export default function PageRecord({global}) {
    const [options,setOptions] = useState([])
    const [param,setParam] = useState([])
    const [data,setData] = useState(null)

    const search = () => {
        const query = param.join('')
        log(query)
        axios.get(`${$conf.api.host}/record/search?${query}`)
            .then(({data: {data,code}}) => {
                if(code === 200) {
                    setData(<RecordList dataSource={data} />)
                }
            })
    }

    useEffect(() => {
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
                <h3>历史考勤记录📝</h3>
                <Cascader className="select-record" options={options} onChange={setParam} placeholder="Please select" />
                <Button type="primary" className="search-record" onClick={search}><Icon type="search" /> 查询考勤</Button>
            </div>
            <div className="content">
                {data}
            </div>
        </MainContainer>
    )
}

