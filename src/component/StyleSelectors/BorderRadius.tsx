import React from 'react'
import Slider from '../../component/Slider'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import { getNumbericValue } from '../../helper'
import styles from '../StyleSelectors/style.module.sass'

const BorderRadius = () => {

    const applyStyle = useApplyStyle()
    const borderRadius = useStyleValue('borderRadius')
    
    return (
        <div className={styles.container}>
        <span>Border radius</span>
        <Slider
            value={getNumbericValue(borderRadius)}
            onChange={value => {
                applyStyle('borderRadius', value + 'px')
            }}
        />
        </div>
    )
}

export default BorderRadius 
