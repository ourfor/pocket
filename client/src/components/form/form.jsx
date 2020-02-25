import styled from 'styled-components'

export const FormItem = styled.span`
    padding: ${props => props.gap?props.gap:0}px 5px;
    display: ${props => props.display?props.display:'inline-flex'};
    align-items: center;
    height: 32px;
    box-sizing: content-box;
`