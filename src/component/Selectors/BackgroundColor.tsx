import ColorPicker from "../ColorPicker"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"

const BackgroundColor = () => {
    const applyStyle = useApplyStyle()
    const color = useStyleValue("backgroundColor")

    return (
        <ColorPicker
            label="Background color"
            allowGradient
            value={color}
            onChange={(value) => {
                applyStyle("backgroundColor", value)
            }}
        />
    )
}

export default BackgroundColor
