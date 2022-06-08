import styles from "./styles.module.sass"
import { Text } from "../Styled"
interface PickerProps {
    label: string
    onChange: (value: string) => void
    value?: string
    allowGradient?: boolean
}

const ColorPicker = (props: PickerProps) => {
    const handleChange = ({ style }) => {
        props.onChange(style)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text>{props.label}</Text>
                <input
                    type="color"
                    onChange={(event) => {
                        handleChange({ style: event.target.value })
                    }}
                />
            </div>
        </div>
    )
}

export default ColorPicker
