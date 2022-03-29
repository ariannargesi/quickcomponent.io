import React from 'react'
import { Select } from 'antd'
import { useDispatch } from 'react-redux'
import Slider from "@mui/material/Slider"
import style from './style.module.sass'
import { applyStyle } from '../../redux/slice'

const options = [
    {value: '400', label: '400'},
    {value: '700', label: '700'},
]

const FontWeight = () => {
    const dispatch = useDispatch()

    let position = 'absolute'

    return (
        <div style={{width: '100%'}}>
            <span className={style.label}>Font weight</span>
            <Select
                style={{width: '120px'}}
                defaultValue={'static'}
                options={options}
                onChange={value => {
                    dispatch(applyStyle({
                        key: 'position',
                        value: value 
                    }))
                }}
            />
        </div>
    )
}

export default FontWeight 