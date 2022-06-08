import { useState } from "react"
import { colorPrimary } from "../Styled"

import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 8px 0;
`
const SwitchContainer = styled.div`
    height: 30px;
    border-radius: 20px;
    width: 75px;
    background: ${(props) => (props.active ? "darkgray" : colorPrimary)};
    position: relative;
    cursor: pointer;
    padding: 1px;
`
const SwitchHandle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: white;
    position: absolute;
    ${(props) => (props.active ? "left: 1px" : "right: 1px")};
`

interface Props {
    onChange: (value: boolean) => void
}

const Switch = (props: Props) => {
    const [state, setState] = useState(false)

    const toggle = () => {
        setState(!state)
        props.onChange(state)
    }

    return (
        <Container>
            <SwitchContainer active={state} onClick={toggle}>
                <SwitchHandle active={state}></SwitchHandle>
            </SwitchContainer>
        </Container>
    )
}

export default Switch
