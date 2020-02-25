import styled from 'styled-components'
import welcome_image from './welcome.png'

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
        position: relative;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);

        &::before {
            content: '';
            display: block;
            position: absolute;
            height: 80px;
            width: 250px;
            top: -54px; left: 0;
            background: url(${welcome_image}) no-repeat;
            background-size: contain;
            pointer-events: none;
        }
    }
`

export const Span = styled.div`
    display: flex;
`


function Container({className,children,theme=$conf.theme?$conf.theme:'light'}) {
    return (
        <div className={`theme-${theme} ${className}`}>
            <section>
                {children}
            </section>
        </div>
    )
}