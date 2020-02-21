import { Lessons } from './lessons'
import { Record } from './record'

export default function Teacher({data,user,dispatch,todo}) {
    return (
        <section type="teacher">
            <Lessons dataSource={data.lessons} />
            <Record dataLimit={data} userId={user} dispatch={dispatch} todo={todo}/>
        </section>
    )
}