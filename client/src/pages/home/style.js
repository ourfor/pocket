import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    & > section {
        width: 1000px;
        min-height: 84%;
        padding: 10px 8px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);
        max-height: 90%;
        overflow-y: scroll;

        .headerbar {
            display: flex;
            h3 {
                padding: 0 4px;
            }
        }

        h3 {
            font-weight: 300;
        }
    }
`