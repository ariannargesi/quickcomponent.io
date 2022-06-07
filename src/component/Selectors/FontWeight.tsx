import Select from "../Select"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"

const options = [
    { label: "400", value: '400' },
    { label: "700", value: '700' },
]

const FontWeight = () => {
    const applyStyle = useApplyStyle()
    const fontWeight = useStyleValue("fontWeight") || 400

    return (
        <div
            style={{
                display: "flex",
                padding: "16px",
                justifyContent: "space-between",
            }}
        >
                <Select
                    inline
                    label="Font weight"
                    value={fontWeight}
                    options={options}
                    onChange={(e) => {
                        applyStyle("fontWeight", e)
                    }}
                />
        </div>
    )
}

export default FontWeight
