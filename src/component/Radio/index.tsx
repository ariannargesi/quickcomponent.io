import React from 'react'
import propTypes from 'prop-types'
import './styles.css'
 
interface Props {
    options: string[],
    onChange: any,
    activeItem?: string | number,
    style?: string,
    activeIndex?: number 
}

const Radio = (props: Props) => {

    const { options, onChange, activeItem, style } = props 
    
    return (
        <ul className={style === 'gray' ? 'radioType1' : 'radioType2'}>
            {options && options.map((item, index) => <li className={item === activeItem ? 'active' : null} onClick={() => onChange(item)}>{item}</li>)}
        </ul>
    )
}

export default Radio 
