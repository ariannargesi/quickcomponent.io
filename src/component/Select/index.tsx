import { Select } from "antd"
import style from "../Selectors/styles.module.sass"
const Component = (props: {
    label: string
    onChange: (value: string | number) => void
    options: any
    value: string | number
}) => {
    return (
        <div>
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
