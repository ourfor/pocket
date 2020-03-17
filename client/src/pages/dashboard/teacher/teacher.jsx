import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { Table, Footer, Style } from '../../../components/table/table'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { columns } from './columns'


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
        <Style className="teachers">
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>👨‍🏫 教师列表</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={data} /> : <Loading />}
            <Footer add={{text: '添加教师 👨‍🏫'}} 
                    remove={{text: '删除教师 🤚'}}
                    update={{text: '更新教师信息 💄'}}>
            </Footer>
        </Style>
    )
}

export default connect(Teacher)