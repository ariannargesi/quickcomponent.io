import React from 'react'
import ColorPicker from '../ColorPicker'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import styles from '../StyleSelectors/style.module.sass'


const BackgroundColor = () => {
    const applyStyle = useApplyStyle()
    const color = useStyleValue('background')
    return (
        <ColorPicker
            label='Background color'
            allowGradient
            value={color}
            onChange={value => {
                applyStyle('backgroundColor', value)
            }}
        />
    )
}

export default BackgroundColor 