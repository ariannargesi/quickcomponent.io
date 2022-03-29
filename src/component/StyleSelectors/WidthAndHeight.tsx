import React from 'react'
import style from './style.module.sass'
import Radio from '../Radio'
import Slider from '../Slider'
import useStyleValue from '../../hooks/useStyleValue'
import useApplyStyle from '../../hooks/useApplyStyle'
import { getUnit, getNumbericValue as getValue } from '../../helper'
const units = ['px', '%', 'rem']

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const WidthAndHeight = () => {
    const applyStyle = useApplyStyle()
    const width = useStyleValue('width')
    const widthUnit = getUnit(width)
    const widthValue = getValue(width)
    const height = useStyleValue('height')
    const heightUnit = getUnit(height) 
    const heightValue = getValue(height) 
    return (
        <>
            <div className={style.container}>
                <div style={styles.header}>
                    <span>Width:</span>
                    <Radio options={units} activeItem={widthUnit} onChange={(value) => {
                        applyStyle('width', widthValue + value)
                    }} />
                </div>
                <div className={style.body}>
                    <Slider
                        value={widthValue}
                        onChange={(value) => {
                            applyStyle('width', value + widthUnit)
                        }}
                    />
                </div>
            </div>
            <div className={style.container}>
                <div style={styles.header}>
                    <span>Height:</span>
                    <Radio options={units} activeItem={heightUnit} onChange={(value) => {
                        applyStyle('height', heightValue + value)
                    }} />
                </div>
                <div className={style.body}>
                    <Slider
                        value={heightValue}
                        onChange={(value) => {
                            applyStyle('height', value + heightUnit)
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default WidthAndHeight