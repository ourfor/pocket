import { useState, useEffect } from 'react'
import { Button, Tag, message, Input, Icon, Select } from 'antd'
import axios from 'axios'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { Table, Footer, Style } from '../../../components/table/table'
import { create, remove as rm, update as up, UpdateButton, RemoveButton } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

const { Option } = Select


function Student({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [type,setType] = useState(null)

    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{students {stuName,stuID,sex,classID,siteNo,MAC}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                const { students } = data
                columns[columns.length-1].render = 
                    id => <RemoveButton onClick={() => action(id,false)}/>
                columns[columns.length-2].render = 
                    id => <UpdateButton onClick={() => action(id,true)}/>
                const map = {}
                students.map((student) => (map[student.stuID] = student))
                setData(map)
            }
        })
        function action(id,isUpdate) {
            setId(id)
            setType(isUpdate?`update-${Date.now()}`:'delete')
        }
    }, [])


    useEffect(() => {
        data !== null && type && id && (type==='delete'?remove(id,reload):update(data[id],reload))
    },[type,id])

    const reload = (student, type) => {
        switch(type) {
            case 'update':
            case 'create': {
                const tmp = {...data}
                tmp[student.stuID] = student
                setData(tmp)
                break
            }
            case 'delete': {
                const tmp = {...data}
                delete tmp[student.stuID]
                setData(tmp)
                setId(null)
                break
            }
            default: {

            }
        }
    }

    return (
        <Style className="students" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>学生列表 🍐</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={Object.values(data)} /> : <Loading />}
            <Footer id={id} add={{text: '添加学生 👨‍🎓', action: () => add(reload)}} >
            </Footer>
        </Style>
    )
}

const add = (callback) => create({
    title: {
        tip: '请填写学生信息: 👀',
        success: msg => `成功添加学生 ${msg}`,
        error: '学生添加失败 😮',
    },
    Content: StudentInfo,
    query: ({nickname,stuId,password,sex,classId,siteNo}) => (`
        mutation {
            createStudent(student: {
                stuName: "${nickname}",
                stuID: "${stuId}",
                password: "${password}",
                sex: ${sex===1},
                classID: ${classId},
                siteNo: ${siteNo}
            }){
                stuName,stuID,sex,classID,siteNo,MAC
            } 
        }
    `),
    result: ({createStudent: {stuName}}) => stuName,
    callback: ({ createStudent: student }) => callback(student,'create')
})

const update = (student,callback) => up({
    db: student,
    title: {
        tip: '不需要更新的信息留空即可',
        success: msg => `成功更新学生 ${msg} 的信息 👌`,
        error: '学生信息更新失败 😮',
    },
    Content: StudentInfo,
    query: ({nickname,stuId,password,sex,classId,siteNo}) => `
        mutation {
            updateStudent(student: {
                stuName: "${nickname}",
                stuID: "${stuId}",
                password: ${password?`"${password}"`:null},
                sex: ${sex===1},
                classID: ${classId},
                siteNo: ${siteNo}
            }){
                stuName,stuID,sex,classID,siteNo,MAC
            }
        }
    `,
    result: ({updateStudent: { stuName }}) => stuName,
    callback: ({ updateStudent: student }) => callback(student,'update')
})

const remove = (id,callback) => rm({
    title: {
        tip: '请输入学生👨‍🎓ID以确认删除学生信息: ',
        success: msg => `成功删除学生 ${msg} `,
        error: '学生删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteStudent(id: "${data}"){
                stuName,stuID
            }
        }
    `),
    result: ({ deleteStudent: { stuName } }) => stuName,
    callback: ({ deleteStudent: student }) => callback(student,'delete'),
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 学号</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

function StudentInfo({value={},set,disabled=false}) {
    const [sex,setSex] = useState(value.sex?1:0)
    const [nickname,setNickname] = useState(value.stuName)
    const [password,setPassword] = useState(null)
    const [classId,setClassId] = useState(value.classID)
    const [stuId,setStuId] = useState(value.stuID)
    const [siteNo,setSiteNo] = useState(value.siteNo)
    
    useEffect(() => {
        set({ stuId, nickname, classId, sex, siteNo, password })
    })

    return (
        <div>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="user" /> 姓名</Tip>
                <Input value={nickname} 
                    onChange={({target: {value}}) => setNickname(value)} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="#c22f3c"><Icon type="idcard" /> 学号</Tip>
                <Input disabled={disabled} value={stuId}
                    onChange={({target: {value}}) => setStuId(value)} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="orange"><Icon type="key" /> 密码</Tip>
                <Input value={password} type="password" autoComplete="new-password"
                    onChange={({target: {value}}) => setPassword(value)} />
            </FormItem>

            <FormItem gap={10} display="flex">
                <Tip color="blue"><Icon type="key" /> 性别</Tip>
                <Select defaultValue={sex} onChange={setSex}>
                    <Option value={1}><Icon type="man" /> 男</Option>
                    <Option value={0}><Icon type="woman" /> 女</Option>
                </Select>
            </FormItem>

            <FormItem gap={10} display="flex" width={120}>
                <Tip color="gold"><Icon type="select" /> 班级</Tip>
                <Input defaultValue={classId} value={classId}
                    onChange={({target: {value}}) => setClassId(value)}  />
            </FormItem>

            <FormItem gap={10} display="flex" width={200}>
                <Tip color="black"><Icon type="gold" /> 座位号</Tip>
                <Input value={siteNo}
                    onChange={({target: {value}}) => setSiteNo(value)}  />
            </FormItem>
        </div>
    )
}

export default connect(Student)