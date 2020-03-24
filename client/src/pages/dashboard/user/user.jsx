import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tag, Icon, Input, message } from 'antd'
import { connect } from '../../../store/connect'
import { Span } from '../../../components/layout/layout'
import { Table, Footer, Style } from '../../../components/table/table'
import { GoBack } from '../../../components/menu-bar/menu-bar'
import Loading from '../../../components/loading/loading'
import { create, remove as rm, update as up, UpdateButton, RemoveButton } from '../../../components/crud/crud'
import { columns } from './columns'

import { Tip } from '../../../components/tip/tip'
import { FormItem } from '../../../components/form/form'

function User({global, dispatch}) {
    const [data,setData] = useState(null)
    const [id,setId] = useState(null)
    const [type,setType] = useState(null)

    useEffect(() => {
        const headers = $conf.api.headers
        const param = `{"query": "{users {userName,userID}}"}`
        axios.post(`${$conf.api.host}/admin`,param,{headers})
        .then(({data: { code, data }}) => {
            if(code===200) {
                const { users } = data
                columns[columns.length-1].render = 
                    id => <RemoveButton onClick={() => action(id,false)}/>
                columns[columns.length-2].render = 
                    id => <UpdateButton onClick={() => action(id,true)}/>

                const map = {}
                users.map(user => (map[user.userID] = user))
                setData(map)
            }
        })
        function action(id,isUpdate) {
            setId(id)
            setType(isUpdate?`update-${Date.now()}`:'delete')
        }
    }, [])

    const reload = (user, type) => {
        switch(type) {
            case 'update':
            case 'create': {
                const tmp = {...data}
                tmp[user.userID] = user
                setData(tmp)
                break
            }
            case 'delete': {
                const tmp = {...data}
                delete tmp[user.userID]
                setData(tmp)
                setId(null)
                break
            }
            default: {}
        }
    }

    useEffect(() => {
        data !== null && type && id && (type==='delete'?remove(id,reload):update(data[id],reload))
    },[type,id])

    return (
        <Style className="Users" ID={id}>
            <Span>
                <GoBack path="/dashboard" />
                <h3 align="center" style={{flexGrow: 1, fontFamily: 'cursive'}}>👨‍🏫 教师列表</h3>
            </Span>
            {data ? <Table columns={columns} dataSource={Object.values(data)} /> : <Loading />}
            <Footer id={id} add={{text: '添加用户 👨‍🏫', action: () => add(reload)}} >
            </Footer>
        </Style>
    )
}

const add = (callback) => create({
    title: {
        tip: '请填写用户信息: 👀',
        success: msg => `成功添加用户 ${msg}`,
        error: '用户添加失败 😮',
    },
    Content: UserInfo,
    query: ({nickname,userId,password}) => (`
        mutation {
            createUser(user: {
                userName: "${nickname}",
                userID: ${userId},
                password: "${password}",
            }){
                userName, userID
            }
        }
    `),
    result: ({createUser: {userName}}) => userName,
    callback: ({createUser: user}) => callback(user,'create')
})

const update = (user,callback) => up({
    db: user,
    title: {
        tip: '不需要更新的信息留空即可',
        success: msg => `成功更新用户 ${msg} 的信息`,
        error: '用户信息更新失败 😮',
    },
    Content: UserInfo,
    query: ({userId, password, nickname}) => `
        mutation {
            updateUser(user: {
                userName: "${nickname}",
                userID: ${userId},
                password: ${password?`"${password}"`:null},
            }){
                userName, userID
            }
        }
    `,
    result: ({updateUser: { userName }}) => userName,
    callback: ({updateUser: user}) => callback(user,'update')
})

const remove = (id,callback) => rm({
    title: {
        tip: '请输入用户👩‍🏫ID以确认删除教师信息: ',
        success: msg => `成功删除用户 ${msg}`,
        error: '用户删除失败 😮',
    },
    query: (data) => (`
        mutation {
            deleteUser(id: ${id}){
                userName,userID
            }
        }
    `),
    result: ({ deleteUser: { userName } }) => userName,
    callback: ({deleteUser: user}) => callback(user,'delete'),
    Content: ({set}) => (
        <FormItem gap={10} display="flex">
            <Tip color="#c22f3c"><Icon type="idcard" /> 用户ID</Tip>
            <Input defaultValue={id} onChange={({target: {value}}) => set(value)} />
        </FormItem>
    ),
    id
})

function UserInfo({value={},set,disabled=false}) {
    const [nickname,setNickname] = useState(value.userName)
    const [password,setPassword] = useState(null)
    const [userId,setUserId] = useState(value.userID)

    useEffect(() => {
        set({ userId, nickname, password})
    })

    return (
        <div>
            <FormItem gap={10} display="flex" width={250}>
                <Tip color="green"><Icon type="user" /> 姓名</Tip>
                <Input value={nickname} 
                    onChange={({target: {value}}) => setNickname(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={220}>
                <Tip color="#c22f3c"><Icon type="idcard" /> 用户ID</Tip>
                <Input disabled={disabled} value={userId} name="userId"
                    onChange={({target: {value}}) => setUserId(value)} />
            </FormItem>

            <FormItem gap={10} display="flex" width={270}>
                <Tip color="orange"><Icon type="key" /> 密码</Tip>
                <Input value={password} type="password" autoComplete="new-password"
                    onChange={({target: {value}}) => setPassword(value)} />
            </FormItem>
        </div>
    )
}

export default connect(User)