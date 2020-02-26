import styled from 'styled-components'

export const Style = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        font-weight: 300;
    }

    .content {
        width: 280px;
        padding: 20px;
        box-shadow: 0 0 10px 0 rgba(0,33,79,0.11);
        border-radius: 8px;
        text-align: center;

        & > button {

        }
    }
`