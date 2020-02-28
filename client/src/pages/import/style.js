import styled from 'styled-components'
import { MainContainer } from '../../components/layout/layout'

export const Style = styled(MainContainer)`
    .header-bar {
        display: flex;
        h3 {
            flex-grow: 1;
            text-align: center;
            font-weight: 300;
        }
    }

    .add-lesson {
        justify-content: center;
        border: 1px dashed #e9e9e9;
        margin-top: 10px;
        border-radius: 4px;

        div.row {
            display: flex
            flex-wrap: wrap
        }
    }

`