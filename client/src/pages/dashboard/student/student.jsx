import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { StudentList } from './table'


function Student({global, dispatch}) {
    const [data,setData] = useState(null)
    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{students {stuName,stuID,sex,classID,siteNo,MAC}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                setData(data.students)
            }
        })
    }, [])

    return (
        <div className="students">
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>学生列表 🍐</h3>
            </Span>
            {data ? <StudentList dataSource={data} /> : <Loading />}
        </div>
    )
}

export default connect(Student)