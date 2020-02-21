import styled from 'styled-components'

export const MainContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    & > section {
        width: ${props => props.width? props.width:1200}px;
        height: ${props => props.height? props.height:'auto'};
        min-height: ${props => props.minHeight? props.minHeight:'84%'};
        padding: 10px 8px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);
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