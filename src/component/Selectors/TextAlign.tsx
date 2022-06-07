import { AlignLeft, AlignCenter, AlignRight } from "react-feather"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"
import style from "./styles.module.sass"
import { Text } from '../Styled'
const TextAlign = () => {
    const applyStyle = useApplyStyle()
    const textAlign = useStyleValue("textAlign")

    const handleClick = (value) => {
        applyStyle("textAlign", value)
    }

    return (
        <div className={[style.container, style.textAlign].join(" ")}>
            <Text >Text align: </Text>
            <div className={style.buttons}>
                <AlignLeft
                    onClick={() => handleClick("left")}
                    className={textAlign === "left" ? style.active : undefined}
                />
                <AlignCenter
                    onClick={() => handleClick("center")}
                    className={textAlign === "center" ? style.active : undefined}
                />
                <AlignRight
                    onClick={() => handleClick("right")}
                    className={textAlign === "right" ? style.active : undefined}
                />
            </div>
        </div>
    )
}

export default TextAlign
