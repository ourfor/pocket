import styled from 'styled-components'
import { Table as TableView, Button, Divider, Tag, Radio, Icon } from 'antd'

export function Table({columns,dataSource, ...rest}) {
    const data = dataSource.map((v,i) => ({...v,key: `row-${i}`}))
    return <TableView columns={columns} dataSource={data} {...rest} />
}

export function Footer({add, remove, update, id='xx xx xx xx'}) {
    return (
        <FooterStyle>
            <Icon type="smile" theme="twoTone" />
            <Button onClick={add.action}>{add.text}</Button>
            <Button disabled={remove.disabled} onClick={remove.action}>{remove.text}</Button>
            <Button disabled={remove.disabled} onClick={update.action}>{update.text}</Button>
            <Tag color="green">选中后即可进行删除和更新操作</Tag>
            <Tag color="black" 
                style={{visibility: id?'visible':'hidden'}}>
                {id?id:'xx xx xx xx'}
            </Tag>
        </FooterStyle>
    )
}

export const FooterStyle = styled.footer`
    padding: 0 20px;

    & > i {
        font-size: 20px;
    }

    & > button {
        margin: 0 10px;
    }

    & > span {
        padding: 5px 10px;
        font-size: 13px;
    }
`

export const Style = styled.div`
    position: absolute;
    top: 10px; bottom: 10px; left: 8px; right: 8px;

    table {
        span[name="${props => props.ID?props.ID:''}"] {
            color: #52c41a;
            background: #f6ffed;
            border-color: #b7eb8f;
        }

        span[name] {
            cursor: pointer;
        }
    }

    & > footer {
        position: absolute;
        bottom: 0;
    }
`