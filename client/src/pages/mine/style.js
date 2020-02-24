import styled from 'styled-components'

export const Style = styled.div`
    height: 100%;
    box-sizing: border-box;

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

            .mine-avatar {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 10px solid #ccc9bfe8;
            }

            .mine-info-form {
                padding-top: 25px;
                width: 100%;

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