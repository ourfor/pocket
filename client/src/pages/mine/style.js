import styled from 'styled-components'
import { mobile, tablet } from '../../components/layout/device'
import { MainContainer as Container } from '../../components/layout/layout'

export const MainContainer = styled(Container)`
    & > section {
        width: 800px;
        height: 74%;
        min-height: 74%;
        ${mobile} {
            width: 100%;
        }
    }
`

export const Style = styled.div`
    height: 100%;
    box-sizing: border-box;

    .switch {
        display: none;

        ${mobile} {
            display: block;
            position: fixed;
            top: 50%;
            right: 10px;
            width: 40px;
            height: 40px;
            border: none;
            padding: 0;
            
            &,&:hover,&:focus,&:active {
                background: url('/images/bluetooth.png') no-repeat;
                background-size: contain;
            }
        }
    }

    .mine-bluetooth.mobile-show + .switch {
            &,&:hover,&:focus,&:active {
                background: url('/images/avatar.png') no-repeat;
                background-size: contain;
            }
        }
    }

    .page-mine-student {
        height: 100%;
        padding-top: 20px;
        display: flex;
        .page-left-area {
            display: flex;
            padding: 0 20px;
            width: 400px;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;

            ${mobile} {
                display: none;
                
                &.mobile-show {
                    width: 100%;
                    display: flex;
                    animation: elastic 1s;
                }
            }



            .mine-avatar {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 10px solid #ccc9bfe8;
            }

            .mine-info-form {
                padding-top: 25px;
                width: 100%;

                .ant-input {
                    width: auto;
                }

                .ant-input-group-wrapper {
                    margin: 8px 0;
                }
            }

        }

        .mine-bluetooth {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            ${mobile} {
                display: none;
            }

            &.mobile-show {
                display: flex;
                animation: elastic 1s;
            }


            &>img {
                width: 200px;
                padding-bottom: 20px;
                padding-top: 20px;
            }

            & > span {
                margin-bottom: 15px;
            }
            
            .bluetooth-addr {
                width: 42px;
                text-align: center;
            }

            .ant-tag {
                padding: 1px;
            }

            button {
                margin-top: 20px;
            }

        }
    }
`

export const Div = styled.div`
    width: 100%;
    text-align: center;
    padding: 2px;
`