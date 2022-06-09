import styled from "styled-components"
import { fontFamily } from "../Styled"
interface Props {
    options: string[]
    onChange: (value: string) => void
    activeItem?: string | number
    type?: string
    large?: boolean
}

const Container = styled.ul`
    padding: 0;
    cursor: pointer;
    display: inline-block;
    background: #eee;
    font-family: ${fontFamily};
    font-size: ${(props) => (props.large ? "18px" : "12px")};
    border-radius: 10px;
`

const Item = styled.div`
    padding: ${(props) => (props.large ? "5px 10px" : "5px")};
    min-width: 40px;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    ${(props) =>
        props.active === true && "color: white; background-color: #1976d2;"}
`

const Radio = (props: Props) => {
    return (
        <Container large={props.large}>
            {props.options.map((item) => (
                <Item
                    large={props.large}
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
