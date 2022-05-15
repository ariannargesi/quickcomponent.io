import { Select } from "antd"
import { LabeledValue } from "antd/lib/select"

import style from "../Selectors/styles.module.sass"

import styles from "./styles.module.sass"
const Component = (props: {
    label: string
    onChange: (value: string | number) => void
    options: LabeledValue[]
    value: string | number
}) => {
    return (
        <div className={styles.container}>
            <span className={style.label}>{props.label}</span>
            <Select
                style={{ width: 120 }}
                value={props.value}
                onChange={props.onChange}
                options={props.options}
            />
        </div>
    )
}

export default Component
