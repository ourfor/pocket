import { Button, Icon, Input } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Style } from './style'
import { connect } from '../../store/connect'
import { GoBack } from '../../components/menu-bar/menu-bar'
import { FormItem } from '../../components/form/form'
import { Tip } from '../../components/tip/tip'
import { create, remove as rm, update as up, UpdateButton, RemoveButton } from '../../components/crud/crud'
import { ButtonTip } from '../../components/tip/tip'
import { Lesson } from './lesson'
import { Lessons } from '../home/lessons'


function ImportPage({global,dispatch}) {
    const [db,setDB] = useState(global.home? global.home:{lessons: [], rooms: [],todo: []})
    const [show,setShow] = useState(false)
    const [id,setId] = useState(null)
    const [type,setType] = useState(null)
    
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

    const add = (data) => {
        const lessons = [...db.lessons,data]
        setDB({...db,lessons})
        setShow(false)
    }

    function action(id,isUpdate) {
        setId(id)
        setType(isUpdate?`update-${Date.now()}`:'delete')
    }

    const reload = (lesson,type) => {
        switch(type) {
            case 'update': {
                const {lessonID,term} = lesson
                const ID = `${lessonID}-${term}`
                lesson.id = ID
                const tmp = [...db.lessons]
                let key = null
                tmp.forEach(({lessonID,term},index) => {
                    if(`${lessonID}-${term}`===ID) {
                        key = index
                        return
                    }
                })
                tmp[key] = lesson
                setDB({...db, lessons: tmp})
                break
            }
            case 'delete': {
                const tmp = [...db.lessons]
                const result = tmp.filter(({lessonID,term}) => (
                    lessonID!==lesson.lessonID||term!==lesson.term
                ))
                setDB({...db, lessons: result})
                setId(null)
                break
            }
            default: {}
        }
    }

    useEffect(() => {
        const lesson = db && db.lessons.filter(({lessonID,term}) => (`${lessonID}-${term}`===id))
        db !== null && type && id && (type==='delete'?remove(id,reload):update(lesson,db.rooms,reload))
    },[type,id])

    return (
        <Style theme={global.theme}>
            <div className="header-bar">
                <GoBack /> 
                <h3> 导入课表 🚀</h3>
            </div>
            <div className="content">
                <ButtonTip type="schedule" text="我的课程" theme="green"/>
                <Lessons dataSource={db.lessons.map((lesson) => ({...lesson,id: `${lesson.lessonID}-${lesson.term}`}))} 
                    update={id => <UpdateButton onClick={() => action(id,true)}/>} 
                    remove={id => <RemoveButton onClick={() => action(id,false)}/>}/>
                <ButtonTip onClick={()=>setShow(true)} type="plus-circle" text="添加课程" theme="#a74aed"/>
                {show ? <Lesson finish={add} teachId={global.data.id} rooms={db.rooms} /> : null}
            </div>
        </Style>
    )
}

const remove = (id,callback) => rm({
    title: {
        tip: '请确认即将删除的课程🌅信息: ',
        success: msg => `成功删除课程(${msg})`,
        error: '课程删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteLesson(id: "${data.split('-')[0]}", term: "${data.split('-')[1]}"){
                lessonName,lessonID,term
            }
        }
    `),
    result: ({ deleteLesson: { lessonName } }) => lessonName,
    callback: ({deleteLesson: lesson}) => callback(lesson,'delete'),
    Content: ({set}) => (
        <>
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="key" /> 课程ID</Tip>
            <Input disabled defaultValue={id.split('-')[0]} onChange={({target: {value}}) => set(value)} />
        </FormItem>
        <FormItem gap={10} display="flex">
            <Tip color="orange"><Icon type="idcard" /> 开课学期</Tip>
            <Input disabled defaultValue={id.split('-')[1]} onChange={({target: {value}}) => set(value)} />
        </FormItem>
        </>
    ),
    id
})

const update = (lesson,rooms,callback) => up({
    db: lesson,
    title: {
        tip: '不需要更新的课程信息留空即可(如需修改班级，请删除课程后重新添加): 👀',
        success: msg => `成功更新课程(${msg})的信息`,
        error: '课程信息更新失败 😮',
    },
    Content: (params) => <Lesson hidden {...params} finish={callback} value={lesson[0]} teachId={lesson.teachId} rooms={rooms} />,
    query: ({lessonId,lessonName,term,period,weekday,classNo,teachId,roomId,datetime}) => `
        mutation {
            updateLesson(lesson: {
                lessonID: "${lessonId}",
                term: "${term}",
                lessonName: "${lessonName}",
                weekDay: ${weekday},
                period: ${period},
                teachID: ${teachId},
                roomID: ${roomId},
                beginTime: "${datetime[0]}",
                endTime: "${datetime[1]}"                
            }) {
                lessonID,term,lessonName,weekDay,period,
                teachID,roomID,beginTime,endTime
            }
        }
    `,
    result: ({updateLesson: { lessonName }}) => lessonName,
    callback: ({updateLesson: lesson}) => callback(lesson,'update'),
    width: 540
})



export default connect(ImportPage)