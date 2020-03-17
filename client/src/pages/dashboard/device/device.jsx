import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import { Table, Footer, Style } from '../../../components/table/table'
import Loading from '../../../components/loading/loading'
import { columns } from './columns'


function Device({global, dispatch}) {
    const [data,setData] = useState(null)
    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{devices {svrID,svrKey,version,svrCode,roomID,online,exception}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) setData(data.devices)
        })
    }, [])

    return (
        <Style className="devices">
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>设备列表 🍒</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={data} /> : <Loading />}
            <Footer add={{text: '添加设备 📱'}} 
                    remove={{text: '删除设备 🤚'}}
                    update={{text: '更新设备信息 💄'}}>
            </Footer>
        </Style>
    )
}

export default connect(Device)