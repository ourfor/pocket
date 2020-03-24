import styled from 'styled-components'

export const Style = styled.div`
    section.menus {
        padding-top: 10px;
        & > button {
            margin: 10px 6px;
        }
    }

    .logout {
        border: none;
        position: absolute;
        right: 10px;
        bottom: 10px;

        i {
            font-size: 18px;
            color: black;
        }
    }
`