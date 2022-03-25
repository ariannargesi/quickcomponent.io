import React from 'react'
import propTypes from 'prop-types'
import './styles.css'
 
interface Props {
    options: string[],
    onChange: any,
    activeIndex: number,
    style: string  
}

const Radio = (props: Props) => {

    const { options, onChange, activeIndex, style } = props 
    
    return (
        <ul className={style === 'gray' ? 'radioType1' : 'radioType2'}>
            {options && options.map((item, index) => <li className={index === activeIndex ? 'active' : null} onClick={() => onChange(item)}>{item}</li>)}
        </ul>
    )
}

export default Radio 
