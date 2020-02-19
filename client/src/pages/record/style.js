import styled from 'styled-components'

export const MainContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    & > section {
        width: 1200px;
        min-height: 84%;
        padding: 10px 8px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);
    }
    
    .header-bar {
        display: flex;
        h3 {
            flex-grow: 1;
        }
    }

    & {
        .select-record {
            width: 400px;
        }

        .search-record {
            margin-left: 20px;
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
    } 
`


function Container({className,children}) {
    return (
        <div className={className}>
            <section>
                {children}
            </section>
        </div>
    )
}