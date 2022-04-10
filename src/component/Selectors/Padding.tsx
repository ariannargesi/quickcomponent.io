import { useState } from "react"
import Slider from "../Slider"
import style from "./styles.module.sass"
import { ChevronDown, ChevronUp } from "react-feather"
import useApplyStyle from "../../hooks/useApplyStyle"
import useStyleValue from "../../hooks/useStyleValue"
import { getNumbericValue } from "../../helper"

const Padding = () => {
    const applyStyle = useApplyStyle()
    const [showMore, setShowMore] = useState(false)

    const paddingString = useStyleValue("padding") || "0px"
    const paddingSplit = paddingString.split(" ")

    let paddingDefaultValues = {
        top: "0px",
        bottom: "0px",
        right: "0px",
        left: "0px",
    }

    if (paddingSplit.length === 1) {
        const m = paddingSplit[0]
        paddingDefaultValues = {
            top: m,
            bottom: m,
            left: m,
            right: m,
        }
    } else if (paddingSplit.length == 2) {
        paddingDefaultValues = {
            top: paddingSplit[0],
            bottom: paddingSplit[0],
            left: paddingSplit[1],
            right: paddingSplit[1],
        }
    } else if (paddingSplit.length == 4) {
        paddingDefaultValues = {
            top: paddingSplit[0],
            right: paddingSplit[1],
            bottom: paddingSplit[2],
            left: paddingSplit[3],
        }
    }
    const handleToggle = () => setShowMore(!showMore)

    const handleChange = (direction: string, value: number) => {
        let finalValue = null
        switch (direction) {
            case "all":
                finalValue = value + "px"
                break
            case "right":
                paddingDefaultValues.right = value + "px"
                break
            case "top":
                paddingDefaultValues.top = value + "px"
                break
            case "bottom":
                paddingDefaultValues.bottom = value + "px"
                break
            case "left":
                paddingDefaultValues.left = value + "px"
        }

        let finalPadding
        if (finalValue) finalPadding = finalValue
        else
            finalPadding = `${paddingDefaultValues.top} ${paddingDefaultValues.right} ${paddingDefaultValues.bottom} ${paddingDefaultValues.left}`
        applyStyle("padding", finalPadding)
    }

    return (
        <>
            <div className={style.container}>
                <Slider
                    label="Padding"
                    value={
                        paddingSplit.length === 1
                            ? getNumbericValue(paddingSplit[0])
                            : 0
                    }
                    onChange={(value) => {
                        handleChange("all", value)
                    }}
                />
                <div className={style.alignCenter} onClick={handleToggle}>
                    <span>more</span>
                    {showMore ? <ChevronDown /> : <ChevronUp />}
                </div>
                {showMore && (
                    <div className={style.content}>
                        <Slider
                            labelInline
                            label="Top"
                            value={getNumbericValue(paddingDefaultValues.top)}
                            onChange={(value) => {
                                handleChange("top", value)
                            }}
                        />
                        <Slider
                            labelInline
                            label="Right"
                            value={getNumbericValue(paddingDefaultValues.right)}
                            onChange={(value) => {
                                handleChange("right", value)
                            }}
                        />
                        <Slider
                            labelInline
                            label="Bottom"
                            value={getNumbericValue(paddingDefaultValues.bottom)}
                            onChange={(value) => {
                                handleChange("bottom", value)
                            }}
                        />
                        <Slider
                            labelInline
                            label="Left"
                            value={getNumbericValue(paddingDefaultValues.left)}
                            onChange={(value) => {
                                handleChange("left", value)
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Padding
