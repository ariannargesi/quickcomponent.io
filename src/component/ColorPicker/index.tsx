import React, { useState } from 'react'
import ColoredBox from '../ColoredBox'
import { ColorPicker as ReacetColorPicker } from 'react-color-gradient-picker';
import 'react-color-gradient-picker/dist/index.css';

let sliderLatestValue = '0'

interface PickerProps {
    name: string
    onChange: any,
    values?: string[],
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
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <span style={{paddingRight: '20px'}}>{props.name}</span>
                <ColoredBox 
                    onClick={handleColorBoxClick}
                    color='red'
                />
            </div>
            {showPicker && (
                <div >
                    {props.allowGradient && (
                        <>
                            <label>
                                Is gradient:
                                <input
                                    type="checkbox"
                                    checked={isGradient}
                                    onChange={handleChange}
                                />
                            </label>
                        </>
                    )}

                    <ReacetColorPicker
                        onStartChange={onChange}
                        onChange={onChange}
                        onEndChange={onChange}
                        color={isGradient ? undefined : color}
                        gradient={isGradient ? gradient : undefined}
                        isGradient={isGradient}
                    />
                    <button onClick={handleCancel}>Okay</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

        </div>
    )
}

export default ColorPicker 