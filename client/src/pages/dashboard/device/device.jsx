import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { DeviceList } from './table'


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
        <div className="devices">
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>设备列表 🍒</h3>
            </Span>
            {data ? <DeviceList dataSource={data} /> : <Loading />}
        </div>
    )
}

export default connect(Device)