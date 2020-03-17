import styled from 'styled-components'
import { MainContainer } from '../../components/layout/layout'
import { mobile } from '../../components/layout/device'

export const Container = styled(MainContainer)`
    ${mobile} {
        & > section {
            height: 93%;
        }
    }

    &>section>section[role=student] {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        height: 100%;
        padding: 8px 4px;
        display: flex;
        flex-direction: column;
    }

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

    section[type=student] {
        flex-grow: 1;
        overflow-y: scroll;

        .ant-table-wrapper {

            table {
                span.ant-tag.ant-tag-red.hidden,span.ant-tag.hidden {
                    visibility: hidden;
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
        }
    }
`