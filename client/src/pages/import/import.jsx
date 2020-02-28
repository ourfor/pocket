import { Button } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Style } from './style'
import { connect } from '../../store/connect'
import { GoBack } from '../../components/menu-bar/menu-bar'
import { ButtonTip } from '../../components/tip/tip'
import { Lesson } from './lesson'
import { Lessons } from '../home/lessons'


function ImportPage({global,dispatch}) {
    const [db,setDB] = useState(global.home? global.home:{lessons: [], rooms: [],todo: []})
    const [add,setAdd] = useState(false)
    
    useEffect(() => {
        let result = null
        const { lessons } = db
        if(lessons.length === 0)
        axios.get(`${$conf.api.host}/teacher/lessons?id=${global.data.id}`)
            .then(({data: {code,data}}) => {
                if(code===200) {
                    setDB(data)
                    result = data
                }
            })
        return () => {
            dispatch({type: 'home', home: result})
        }
    },[])

    return (
        <Style theme={global.theme}>
            <div className="header-bar">
                <GoBack /> 
                <h3> 导入课表 🚀</h3>
            </div>
            <div className="content">
                <ButtonTip type="schedule" text="我的课程" theme="green"/>
                <Lessons dataSource={db.lessons} />
                <ButtonTip onClick={()=>setAdd(true)} type="plus-circle" text="添加课程" theme="#a74aed"/>
                {add ? <Lesson finish={()=>setAdd(false)}/> : null}
            </div>
        </Style>
    )
}

export default connect(ImportPage)