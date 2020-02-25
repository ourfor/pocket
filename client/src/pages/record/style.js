import styled from 'styled-components'
import { MainContainer } from '../../components/layout/layout'

export const Container = styled(MainContainer)`
    & > section {
        width: 1200px;
        min-height: 84%;
        padding: 10px 8px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);
        display: flex;
        flex-direction: column;
    }

    & {

        .header-bar {
            display: flex;
            h3 {
                flex-grow: 1;
                text-align: center;
                font-weight: 400;
                color: #191111d9;
                font-family: cursive;
            }
        }

        .header-bar + .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            & > .ant-table-wrapper {
                flex-grow: 1;
            }
        }

        .select-record {
            width: 400px;
        }

        .search-record {
            margin-left: 20px;
        }

        .content-wrap[role=student] {
            overflow-y: scroll;
            max-height: 640px;
        }
        .content[role=student] {
            padding-top: 10px;
        }

        table {
            span.ant-tag.ant-tag-red.hidden,span.ant-tag.hidden {
                visibility: hidden;
            }
        }

        .ant-radio-disabled .ant-radio-inner {
            background-color: #fff;
            border-color: #d9d9d9;
            cursor: not-allowed;
        }
        .ant-radio-disabled .ant-radio-inner::after {
            background-color: white;
            transform: scale(1);
            opacity: 1;
            transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }
        .ant-radio-checked .ant-radio-inner {
            border-color: #1890ff !important;
        }
        .ant-radio-checked .ant-radio-inner::after {
            background-color: #1890ff !important;
        }
    } 
`