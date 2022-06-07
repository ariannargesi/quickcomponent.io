import { LabeledValue } from "antd/lib/select"
import {
    Text,
    baseHight,
    fontFamily,
    fontSizeBase,
    baseTextColor,
} from "../Styled"

import styled from "styled-components"
import { SelectType } from "../../types"

const Container = styled.div`
    width: 100%;
    ${props => {
        if(props.inline)
            return `
                display: flex;
                align-items: center;
                justify-content: space-between;
                select {
                    width: 150px;
                }
            `
        else {
            return `
                select {
                    margin: 8px 0;
                }
            `
        }
    }}
`
const Select = styled.select`
    width: 100%;
    background: transparent;
    outline: none;
    cursor: pointer;
    font-family: ${fontFamily};
    height: ${baseHight};
    font-family: ${fontFamily};
    font-size: ${fontSizeBase};
    color: ${baseTextColor};
    padding: 0 10px;
    border: 1px solid #d9d9d9;
    &: hover {
        border-color: #40a9ff
    }
`

const Component = (props: {
    label?: string
    onChange: (value: string | number) => void
    options: SelectType[]
    value?: string | number
    inline?: boolean 
}) => {
    console.log('rende again')
    return (
        <Container inline={props.inline}>
            <Text>{props.label}</Text>
            <Select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            >
                <option value=''>Please Choose...</option>
                {props.options.map((item) => {
                    return <option key={item.value}>{item.label}</option>
                })}
            </Select>
        </Container>
    )
}

export default Component
