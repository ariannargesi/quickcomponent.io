import React, { useState } from 'react'
import ColoredBox from '../ColoredBox'
import { ColorPicker as ReacetColorPicker } from 'react-color-gradient-picker';
import 'react-color-gradient-picker/dist/index.css';
import styles from '../StyleSelectors/style.module.sass'
import { Button, Checkbox } from 'antd'

interface PickerProps {
    name: string
    onChange: any,
    value?: string 
    values?: any, 
    allowGradient?: boolean
}



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

const ColorPicker = (props: PickerProps) => {
    const [showPicker, setShowPicker] = useState(false)
    const [isGradient, setIsGradient] = useState(false)

    

    const handleColorBoxClick = () => {
        setShowPicker(!showPicker)
    }


    const onChange = (attrs, name) => {
        console.log(attrs, name);
    };

    const handleCancel = () => {
        setShowPicker(false)
    }

    const handleStyleChange = value => {
        props.onChange(value.style.replaceAll(' ', ''))
    }

    const handleCheckBoxChange = (e) => {
        setIsGradient(!isGradient)
    }

    return (
        <div className={styles.container}>
            <div className={styles.colorPickerHeader}>
                <span className={styles.label}>{props.name}</span>
                <ColoredBox
                    onClick={handleColorBoxClick}
                    color={props.value}
                />
            </div>
            {showPicker && (
                <div className={[styles.colorPickerBody, styles.content].join(' ')}>
                    {props.allowGradient && (
                        <div style={{paddingBottom: '16px'}}>
                            <span className={styles.label}>Gradient: </span>
                                <Checkbox
                                    value={isGradient}
                                    onChange={handleCheckBoxChange}
                                />
                        </div>
                    )}

                    <ReacetColorPicker
                        onStartChange={handleStyleChange}
                        onChange={handleStyleChange}       
                        onEndChange={handleStyleChange}
                        color={isGradient ? undefined : color}
                        gradient={isGradient ? gradient : undefined}
                        isGradient={isGradient}
                    />
                    <Button type='primary' onClick={handleCancel}>Okay</Button>
                    <Button type='text' onClick={handleCancel}>Cancel</Button>
                </div>
            )}
        </div>
    )
}

export default ColorPicker 
