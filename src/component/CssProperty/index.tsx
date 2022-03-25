import ColoredBox from '../ColoredBox'

import Select from 'react-select'
import React, { useState } from 'react'
import styles from './index.module.css'
import Slider from "@mui/material/Slider";
import Radio from '../Radio'
import { isKeyword, getPickerType, PickerTypes, getListValues } from '../../helper/stylesPanel'

// gradient picker default value
const gradient = {
    points: [
        {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
        },
    ],
    degree: 0,
    type: 'linear',
};
// color picker default value 
const color = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
};

interface PickerProps {
    name: string
    onChange: any,
    values?: string[]
}

interface MainProps extends PickerProps {
    syntax: string
}
let sliderLatestValue = '0' 
 export const RangePicker = (props: PickerProps) => {

    const [unit, setUnit] = React.useState('px')

    return (
        <div className={styles.cssProperty}>
            <div className={styles.header}>
                <span>{props.name}</span>
                <input className={styles.inputPicker} />
            </div>
            <div className={styles.body}>
                <Slider
                    size={"small"}
                    defaultValue={0}
                    max={500}
                    aria-label={"Small"}
                    valueLabelDisplay={"auto"}
                    onChange={e => {
                        const target = e.target as HTMLInputElement
                        props.onChange(target.value +unit)
                        sliderLatestValue = target.value 
                    }}
                />
            </div>
        </div>
    )
}

const ListPicker = (props: PickerProps) => {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'blue' : 'black',
            cursor: 'pointer',
            background: '#eee',
            padding: 8,
            borderBottom: '1px dashed lightblue',
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 150,
            border: '2px solid white',
            display: 'flex',
            borderRadius: 10,
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }

    

    const options = props.values.map(item => {
        return {
            value: item,
            label: item 
        }
    })

    return (

        <div className={styles.cssProperty}>
            <div className={styles.header}>
                <span>{props.name}</span>
                <Select options={options} styles={customStyles} onChange={e => {
                    props.onChange(e.value)
                }} />
            </div>
        </div>
    )
}

const ColorPicker = (props: PickerProps) => {
    const [showPicker, setShowPicker] = useState(false)
    const [isGradient, setIsGradient] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setIsGradient(Boolean(value))
    };

    const handleColorBoxClick = () => {
        setShowPicker(!showPicker)
    }


    const onChange = (e) => {
        props.onChange(e.style)
        console.log(e.style)
    }

    const handleCancel = () => {
        setShowPicker(false)
    }

    return (
        <div className={styles.cssProperty}>
            <div className={styles.header}>
                <span>{props.name}</span>
                <ColoredBox
                    onClick={handleColorBoxClick}
                    color='red'
                />
            </div>
            {showPicker && (
                <div className={styles.colorPickerContainer}>
                    <label>
                        Is gradient:
                        <input
                            type="checkbox"
                            checked={isGradient}
                            onChange={handleChange}
                        />
                    </label>
           
                    <button onClick={handleCancel}>Okay</button>       
            <button onClick={handleCancel}>Cancel</button>       
                </div>
            )}
            
        </div>
    )
}

const InputPicker = (props: PickerProps) => {
    return (
        <div className={styles.cssProperty}>
            <div className={styles.header}>
                <span>{props.name}</span>
                <input placeholder='Enter your value' className={styles.inputPicker} onChange={e => props.onChange(e.target.value)} />
            </div>
        </div>
    )
} 



const Picker = (props: MainProps): JSX.Element => {
    const pickerType: PickerTypes = getPickerType(props.syntax)

    const handleChange = () => {

    }

    return (
        <div>
            {pickerType === PickerTypes.Range &&
                <RangePicker name={props.name} onChange={props.onChange} />
            }
            {pickerType === PickerTypes.List &&
                <ListPicker name={props.name} onChange={props.onChange} values={getListValues(props.syntax)} />
            }
            {pickerType === PickerTypes.Color &&
                <ColorPicker name={props.name} onChange={props.onChange} />
            }
            {pickerType === PickerTypes.Input &&
                <InputPicker name={props.name} onChange={props.onChange} />
            }
        </div>
    )
}
export default Picker  
