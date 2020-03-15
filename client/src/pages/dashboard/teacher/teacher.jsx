import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { TeacherList } from './table'


function Teacher({global, dispatch}) {
    const [data,setData] = useState(null)
    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{teachers {teachName,teachID,sex}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                setData(data.teachers)
            }
        })
    }, [])

    return (
        <div className="teachers">
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>👨‍🏫 教师列表</h3>
            </Span>
            {data ? <TeacherList dataSource={data} /> : <Loading />}
        </div>
    )
}

export default connect(Teacher)