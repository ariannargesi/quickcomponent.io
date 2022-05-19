import styles from "./styles.module.sass"
import style from "./styles.module.sass"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"
import { getNumbericValue, getUnit } from "../../helper"
import Radio from "../Radio"
import Slider from "../Slider"
const units = ["px", "rem",]

const FontSize = () => {
    const applyStyle = useApplyStyle()
    const fontSize = useStyleValue("fontSize")
    const fontSizeUnit = getUnit(fontSize)
    const fontSizeValue = getNumbericValue(fontSize)

    return (
        <div className={styles.container}>
            <div className={style.header}>
                    <span className={style.label}>Font Size:</span>
                    <Radio
                        options={units}
                        activeItem={fontSizeUnit}
                        onChange={(value) => {
                            applyStyle("fontSize", fontSizeValue + value)
                        }}
                    />
                </div>
            <Slider
                value={fontSizeValue}
                onChange={(value) => {
                    applyStyle("fontSize", value + fontSizeUnit)
                }}
            />
        </div>
    )
}

export default FontSize
