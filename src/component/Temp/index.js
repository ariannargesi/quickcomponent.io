import React from 'react'
import CssProperty from '../CssProperty'
const Temp = () => {
    return (
        <div>
            <CssProperty.Sizing
                label='padding'
            />
            <CssProperty.Select 
                label='padding'
            />
            <CssProperty.Coloring label='Hey'/>
        </div>
    )
}

export default Temp 