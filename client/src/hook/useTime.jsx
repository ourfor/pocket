import { useState, useEffect } from 'react'
import { CopyRight } from './style'

export function DateTime(props) {
    const [datetime,setDateTime] = useState(new Date().toLocaleString())

    useEffect(() => {
        const subscription = setInterval(() => setDateTime(new Date().toLocaleString()),1000)
        return () => clearInterval(subscription)
    },[])

    const [date,time] = datetime.split(" ")
    return (
        <CopyRight>
            <span>💐 {date}</span>
            <span>🍑 {time}</span>
        </CopyRight>
    )
}