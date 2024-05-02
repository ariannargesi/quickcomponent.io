import Select from "../Select"
import Slider from "../Slider"
import style from "./styles.module.sass"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"
import { getNumbericValue } from "../../helper"
import styles from "../Selectors/styles.module.sass"
import { useSelector } from "react-redux"
import { RootState } from "../../types"
const options = [
    { value: "relative", label: "relative" },
    { value: "absolute", label: "absolute" },
    { value: "static", label: "static" },
    { value: "fixed", label: "fixed" },
]

const Positions = () => {
    const applyStyle = useApplyStyle()

    const position = useStyleValue("position") || ""

    const top = useStyleValue("top")
    const bottom = useStyleValue("bottom")
    const right = useStyleValue("right")
    const left = useStyleValue("left")

    const isRoot = useSelector((state: RootState) => {
        if (state.selectedKey === state.map[0].key) return true
        return false
    })

    if (isRoot) return null

    return (
        <div className={styles.container}>
            <Select
                label="Position"
                inline
                value={position}
                options={options}
                onChange={(value) => {
                    applyStyle("position", value)
                }}
            />
            {position && (
                <>
                    <div className={style.flex}>
                        <span>Top</span>
                        <div>
                            <Slider
                                value={getNumbericValue(top)}
                                onChange={(value) => {
                                    applyStyle("top", value + "px")
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Bottom</span>
                        <div>
                            <Slider
                                value={getNumbericValue(bottom)}
                                onChange={(value) => {
                                    applyStyle("bottom", value + "px")
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Left</span>
                        <div>
                            <Slider
                                value={getNumbericValue(left)}
                                onChange={(value) => {
                                    applyStyle("left", value + "px")
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Right</span>
                        <div>
                            <Slider
                                value={getNumbericValue(right)}
                                onChange={(value) => {
                                    applyStyle("right", value + "px")
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Positions
