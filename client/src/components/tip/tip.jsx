import { Button, Icon } from 'antd'
import styled from 'styled-components'

export const Tip = styled.div`
    color: ${props => props.color?props.color:'black'};
    border: 1px dashed #d9d9d9;
    height: 100%;
    width: fit-content;
    line-height: 32px;
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 2px;
    white-space: nowrap;
`

export function TextTip({ type='pushpin', text='提示', theme='white' }) {
    return (
        <Tip style={{borderColor: theme, background: theme}}>
            <Icon type={type} theme="filled" /> {text}
        </Tip>
    )
}

export function ButtonTip({ type='pushpin', text='提示', theme='white', onClick }) {
    return (
        <Button type="primary" onClick={onClick} style={{backgroundColor: theme,borderColor: theme}}>
            <Icon type={type} /> {text}
        </Button>
    )
}


export function Item({ className , label , after , before , icon , children, ...rest }) {
    return (
        <Div {...rest} before={ before ? 'label-before' : '' } 
             after={ after ? 'label-after' : ''} className={`form-item ${className}`}>
            { icon ? <Icon type={icon} style={{fontSize: '20px'}}/> : null }
            { label ? <Span>{label}</Span> : null}
            { children }
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 6px;
    margin-bottom: 6px;
    align-items: stretch;
    opacity: 1;
    transition: opacity 1s;
`

const Span = styled.div`
    background: #fafafa;
    border: 0.994px solid #d9d9d9;
    padding: 0 11px;
    border-radius: 4px;
    border-right-width: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    align-items: center;
`