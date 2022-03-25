import React from 'react'
import {Select} from 'antd'
import style from '../StyleSelectors/style.module.sass'
const Component = (props: {
    label: string,
    onChange: any,
    options: any,
    defaultValue?: string
}) => {
    return (
        <div>
            <span className={style.label}>{props.label}</span>
            <Select
                style={{ width: 120 }}
                onChange={props.onChange}
                options={props.options}
                defaultValue={props.defaultValue}
            />
        </div>
    )
}

export default Component 