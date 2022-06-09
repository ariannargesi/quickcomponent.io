import Slider from "@mui/material/Slider"
import { Text } from "../Styled"

interface Props {
    label?: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    labelInline?: boolean
}

const App = (props: Props) => {
    const inlineStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }

    return (
        <div style={props.labelInline && inlineStyle}>
            {props.label && (
                <Text style={{ width: "60px", paddingRight: "4px" }}>
                    {props.label}
                </Text>
            )}
            <Slider
                min={props.min}
                size={"small"}
                max={props.max}
                value={props.value}
                onChange={({ target }) => {
                    const value = Number((target as HTMLInputElement).value)
                    props.onChange(value)
                }}
            />
        </div>
    )
}

export default App
