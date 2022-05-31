import styled from 'styled-components'
import { fontFamily } from "../Styled"
interface Props {
    options: string[]
    onChange: (value: string) => void
    activeItem?: string | number
    type?: string
}

const Container = styled.ul`
    padding: 0;
    cursor: pointer;
    display: inline-block;
    background: #eee;
    font-family: ${fontFamily};
    font-size: 12px;
    border-radius: 10px;
    li {
       
    }
        
`

const Item = styled.div`
    padding: 5px;
    min-width: 40px;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    ${props => props.active === true && 'color: white; background-color: blue;' }
`

const Radio = (props: Props) => {
    return (
        <Container>
            {props.options &&
                props.options.map((item) => (
                    <Item
                        active={item == props.activeItem}
                        onClick={() => props.onChange(item)}
                        key={item}
                    >
                        {item}
                    </Item>
                ))}
        </Container>
    )
}

export default Radio
