import { useState } from "react"
import { Button, Checkbox } from "antd"
import { ColorPicker as ReacetColorPicker } from "react-color-gradient-picker"
import ColorBox from "../ColorBox"
import styles from "./styles.module.sass"
import "react-color-gradient-picker/dist/index.css"

interface PickerProps {
    label: string
    onChange: (value: string) => void
    value?: string
    allowGradient?: boolean
}

const ColorPicker = (props: PickerProps) => {
    const [showPicker, setShowPicker] = useState(false)
    const [showGradient, setShowGradient] = useState(false)

    const handleChange = ({ style }) => {
        props.onChange(style)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>{props.label}</span>
                <ColorBox
                    onClick={() => setShowPicker((state) => !state)}
                    color={props.value}
                />
            </div>
            {showPicker && (
                <div className={styles.body}>
                    {props.allowGradient && (
                        <div className={styles.checkboxContainer}>
                            <span className={styles.label}>Gradient: </span>
                            <Checkbox
                                value={showGradient}
                                onChange={() =>
                                    setShowGradient((state) => !state)
                                }
                            />
                        </div>
                    )}
                    <ReacetColorPicker
                        onStartChange={handleChange}
                        onChange={handleChange}
                        onEndChange={handleChange}
                        isGradient={showGradient}
                    />
                    {/* Add a hex input for the colour picker and update value*/}
                    <input
                        className={styles.hexInput}
                        type="text"
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                    <Button
                        block
                        type="primary"
                        onClick={() => setShowPicker(false)}
                    >
                        Done
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ColorPicker
