import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '../Slider'
import ColorPicker from '../ColorPicker'
import Select from '../Select'
import {applyStyle} from '../../redux/slice'

const borderStyleOptions = [
    {value: 'solid', label: 'solid'},
    {value: 'dashed', label: 'dashed'}
]

const Border = () => {
    const dispatch = useDispatch()
    const borderString = '2px solid red'
    const borderSplit = borderString.split(' ')
    let borderWidth: string = borderSplit[0].substring(0, borderSplit[0].length -2)
    let borderStyle: string = borderSplit[1]
    let borderColor: string = borderSplit.slice(2, borderSplit.length-1 ).join('')

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
        }

        const finalBorderValue = `${borderWidth} ${borderStyle} ${borderColor}`
        dispatch(applyStyle({
            key: 'border',
            value: finalBorderValue
        }))
    }

    return (
        <>
                
                {/* <Slider
                    label={'border with'}
                    value={0}
                    onChange={value => handleChange(0, value)}
                />
            <Select
                label={'Border style'}
                options={borderStyleOptions}
                onChange={value => handleChange(1, value)}
            />,
            <ColorPicker 
                name='Border Color'
                values={null}
                onChange={value => handleChange(2, value)}
            /> */}
        </>
    )   
}

export default Border 