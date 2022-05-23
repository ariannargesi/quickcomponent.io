import Slider from "@mui/material/Slider"
import styles from "../Selectors/styles.module.sass"
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
            {props.label && <span className={styles.label}>{props.label}</span>}
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
            <input
                className={styles.valueInput}
                type="number"
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
