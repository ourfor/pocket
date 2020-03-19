import axios from 'axios'
import { Modal, message } from 'antd'
const { confirm } = Modal

export function create({db = null, query, result, Content, title: { tip, success, error, other = '遇到错误, 稍后再试吧 😉' } }) {
    confirm({
        title: tip,
        content: <Content set={value => {db = value}} />,
        onOk() {
            const param = query(db)
            const data = JSON.stringify({query: param})
            const headers = $conf.api.headers
            axios.post(`${$conf.api.host}/admin`,data,{headers})
            .then(({data: {code,data}}) => {
                if(code===200) {
                    const msg = result(data)
                    message.success(`${success(msg)} 👌`)
                } else {
                    message.error(error)
                }
            })
            .catch(err => {
                message.error(other)
            })
        }
    }) 
}