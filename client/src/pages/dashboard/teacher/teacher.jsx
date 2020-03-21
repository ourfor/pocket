import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tag, Select, Icon, Input, message } from 'antd'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { Table, Footer, Style } from '../../../components/table/table'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { create, remove as rm, update as up } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

const { Option } = Select

function Teacher({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [teacher,setTeacher] = useState(null)

    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{teachers {teachName,teachID,sex}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                const { teachers } = data
                columns[columns.length-1].render = (
                    id => <Tag color="red" name={id} onClick={() => setId(id)}>选择</Tag>
                )
                const map = {}
                teachers.map(teacher => (map[teacher.teachID] = teacher))
                setData(map)
            }
        })
    }, [])

    const reload = (teacher, type) => {
        switch(type) {
            case 'update':
            case 'create': {
                const tmp = {...data}
                tmp[teacher.teachID] = teacher
                setData(tmp)
                break
            }
            case 'delete': {
                const tmp = {...data}
                delete tmp[teacher.teachID]
                setData(tmp)
                setId(null)
                break
            }
            default: {}
        }
    }

    useEffect(() => {
        id!==null && setTeacher(data[id])
    }, [id,data])

    return (
        <Style className="teachers" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>👨‍🏫 教师列表</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={Object.values(data)} /> : <Loading />}
            <Footer id={id} add={{text: '添加教师 👨‍🏫', action: () => add(reload)}} 
                    remove={{text: '删除教师 🤚', disabled: id===null, action: () => remove(id,reload)}}
                    update={{text: '更新教师信息 💄', disabled: id===null, action: () => update(teacher,reload)}}>
            </Footer>
        </Style>
    )
}

const add = (callback) => create({
    title: {
        tip: '请填写教师信息: 👀',
        success: msg => `成功添加教师 ${msg}`,
        error: '教师添加失败 😮',
    },
    Content: TeacherInfo,
    query: ({nickname,teachId,password,sex}) => (`
        mutation {
            createTeacher(teacher: {
                teachName: "${nickname}",
                teachID: ${teachId},
                password: "${password}",
                sex: ${sex===1},
            }){
                teachName,teachID,sex
            }
        }
    `),
    result: ({createTeacher: {teachName}}) => teachName,
    callback: ({createTeacher: teacher}) => callback(teacher,'create')
})

const update = (teacher,callback) => up({
    db: teacher,
    title: {
        tip: '不需要更新的信息留空即可',
        success: msg => `成功更新教师 ${msg} 的信息`,
        error: '教师信息更新失败 😮',
    },
    Content: TeacherInfo,
    query: ({nickname,teachId,password,sex}) => `
        mutation {
            updateTeacher(teacher: {
                teachName: "${nickname}",
                teachID: ${teachId},
                password: ${password?`"${password}"`:null},
                sex: ${sex===1},
            }){
                teachName,teachID,sex
            }
        }
    `,
    result: ({updateTeacher: { teachName }}) => teachName,
    callback: ({updateTeacher: teacher}) => callback(teacher,'update')
})

const remove = (id,callback) => rm({
    title: {
        tip: '请输入教师👩‍🏫ID以确认删除教师信息: ',
        success: msg => `成功删除教师 ${msg}`,
        error: '教师删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteTeacher(id: ${id}){
                teachName,teachID
            }
        }
    `),
    result: ({ deleteTeacher: { teachName } }) => teachName,
    callback: ({deleteTeacher: teacher}) => callback(teacher,'delete'),
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 教师号</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

function TeacherInfo({value={},set,disabled=false}) {
    const [nickname,setNickname] = useState(value.teachName)
    const [password,setPassword] = useState(null)
    const [sex,setSex] = useState(value.sex?1:0)
    const [teachId,setTeachId] = useState(value.teachID)

    useEffect(() => {
        set({ teachId, nickname, sex, teachId, password})
    })

    return (
        <div>
            <FormItem gap={10} display="flex" width={250}>
                <Tip color="green"><Icon type="user" /> 姓名</Tip>
                <Input value={nickname} 
                    onChange={({target: {value}}) => setNickname(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={120}>
                <Tip color="#c22f3c"><Icon type="idcard" /> 教师号</Tip>
                <Input disabled={disabled} value={teachId} name="teachId"
                    onChange={({target: {value}}) => setTeachId(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={270}>
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
        </div>
    )
}

export default connect(Teacher)