import styled from 'styled-components'
import { MainContainer } from '../../components/layout/layout'

export const Container = styled(MainContainer)`
    .headerbar {
        display: flex;
        h3 {
            padding: 0 4px;
            font-family: cursive;
        }
    }

    h3 {
        font-weight: 300;
    }

    .ic-add,.ic-remove {
        margin-left: 5px;
        margin-right: 5px;
    }    
`