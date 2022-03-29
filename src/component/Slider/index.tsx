import React from 'react'
import Slider, { SliderTypeMap } from '@mui/material/Slider'

interface Props{
    label?: string 
    value: number,
    onChange: any 
}

const App = (props: Props) => {
    
    return (
        <div>
            {props.label && <span>{props.label}</span> }
            <Slider 
                value={props.value}
                onChange={({target}) => {
                    const value = (target as HTMLInputElement).value
                    props.onChange(value)
                }}
            />
        </div>
    )
}

export default App 