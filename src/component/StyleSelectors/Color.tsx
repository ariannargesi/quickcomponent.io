import React from 'react'
import ColorPicker from '../ColorPicker'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import styles from '../StyleSelectors/style.module.sass'


const Color = () => {
    const applyStyle = useApplyStyle()
    const color = useStyleValue('color')
    return (
        <ColorPicker
            name='Color'
            value={color}
            onChange={value => {
                applyStyle('color', value)
            }}
        />
    )
}

export default Color 