import ColorPicker from "../ColorPicker"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"

const BackgroundColor = () => {
    const applyStyle = useApplyStyle()
    const color = useStyleValue("background") || ''

    return (
        <ColorPicker
            label="Background"
            allowGradient
            value={color}
            onChange={(value) => {
                applyStyle("background", value)
            }}
        />
    )
}

export default BackgroundColor
