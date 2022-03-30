import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '../Slider'
import ColorPicker from '../ColorPicker'
import Select from '../Select'
import useStyleValue from '../../hooks/useStyleValue'
import useApplyStyle from '../../hooks/useApplyStyle'
import { getNumbericValue } from '../../helper'
import styles from './style.module.sass'
const borderStyleOptions = [
    {value: 'solid', label: 'solid'},
    {value: 'dashed', label: 'dashed'}
]

const Border = () => {
    const applyStyle = useApplyStyle()
    const borderString = useStyleValue('border') || '1px solid #eee'
    const borderSplit = borderString.split(' ')
    let borderWidth: string = borderSplit[0]
    let borderStyle: string = borderSplit[1]
    let borderColor: string = borderSplit[2]

    const handleChange = (index: number, value): void => {
        switch(index){
            case 0: 
                borderWidth = value + 'px'
                break;
            case 1:
                borderStyle = value 
                break 
            case 2: 
                borderColor = value 
                break 
        }
        const finalBorderValue = `${borderWidth} ${borderStyle} ${borderColor}`
        console.log(finalBorderValue)
        applyStyle('border', finalBorderValue)
    }

    return (
        <>
        <div className={styles.container}>  
            <Slider
                    label={'Border with'}
                    value={getNumbericValue(borderWidth)}
                    onChange={value => handleChange(0, value)}
                />
            <Select
                value={borderStyle}
                label={'Border style'}
                options={borderStyleOptions}
                onChange={value => handleChange(1, value)}
            />
        </div>
        <ColorPicker 
                name='Border Color'
                values={null}
                onChange={value => handleChange(2, value)}
            />
        </>

    )   
}

export default Border 