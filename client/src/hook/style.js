import styled from 'styled-components'

export const CopyRight = styled.div`{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-bottom: 10px;
    margin-top: 10px;

    &>span,&>a>span{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 5px 6px;
        font-family: dm;

        &:first-child{
            background: #030307;
            color: #fadfa3;  
        }

        &:last-child{
            background: #dc1049;
            color: white;
        }

    }
}`