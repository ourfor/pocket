import styled from 'styled-components'
import { Input, Icon , Tag, Button } from 'antd'
import { Tip } from '../../components/tip/tip'
import { FormItem } from '../../components/form/form'

export function Card({index,data,next,prev,size}) {
    const { place, lessonName, btexception, isOver, siteNo, 
            refreshTime, attendTag, phoneIn, term, beginTime } = data
    return (
        <Style className="sign-info-card" key={index}>
            <p><span><Icon type="bulb" />座位</span>{siteNo}</p>
            <FormItem gap={10} display="flex">
                <Tip color="blue"><Icon type="book" /> 课程名</Tip>
                <Tag color={'blue'}>{lessonName}</Tag>

                <Tip color="violet"><Icon type="user" /> 开课学期</Tip>
                <Tag color={'violet'}>{term}</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="brown"><Icon type="clock-circle" /> 上课时间</Tip>
                <Tag color={'brown'}>{beginTime}</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="user" /> 上课地点</Tip>
                <Tag color={'green'}>{place}</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="red"><Icon type="user" /> 刷新时间</Tip>
                <Tag color={'red'} style={{color: refreshTime?'#f5222d':'#fff1f0'}} >
                    {refreshTime?refreshTime:'2020-03-08 23:01:00'}
                </Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="#c6a805"><Icon type="user" /> 出勤状态</Tip>
                <Tag color={'gold'}>迟到</Tag>
                <Tip color="#cc7f8c"><Icon type="import" /> 是否早退</Tip>
                <Tag color={'pink'}>否</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="gray"><Icon type="mobile" /> 手机📱入袋</Tip>
                <Tag color={'gray'}>{phoneIn?'是':'否'}</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="black"><Icon type="exception" /> 蓝牙异常</Tip>
                <Tag color={'black'}>{btexception?'是':'否'}</Tag>
            </FormItem>
            <FormItem gap={10} display="flex">
                <Tip color="green"><Icon type="notification" /> 考勤完结</Tip>
                <Tag color={'green'}>{isOver?'是':'否'}</Tag>
            </FormItem>
            <div className="ic">
                <Button onClick={prev} disabled={index<1}>
                    <Icon type="up-circle" />
                </Button>
                <Button onClick={next} disabled={index+1>=size}>
                    <Icon type="down-circle" />
                </Button>
            </div>
        </Style>
    )
}

const Style = styled.div`
    user-select: none;
    text-align: center;
    positon: relative;

    p {
        font-size: 56px;
        padding: 20px;
        width: fit-content;
        border-radius: 20px;
        color: white;
        position: relative;
        margin: 10px auto;
        box-shadow: 0 1.6px 3.6px 0 rgba(0,0,0,0.132), 
                    0 0.3px 0.9px 0 rgba(0,0,0,0.108);
        background-color: rgb(223, 17, 94);

        span {
            font-size: 13px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%,0);
        }
    }

    & > span {
        span {
            display: inline-flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            margin: 4px;
            box-sizing: border-box;
            white-space: nowrap;
        }
    }

    .ic {
        position: absolute;
        right: 0;
        bottom: 30%;
        display: flex;
        flex-direction: column;
        
        button {
            margin: 10px;
            border-radius: 50%;
            padding: 0;
            font-size: 25px;
            display: inline-flex;
            border: none;
            height: 25px;

            i {
                width: 25px;
                height: 25px;
            }
        }
    }
`