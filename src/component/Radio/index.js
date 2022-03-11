import React from 'react'
import propTypes from 'prop-types'
import './styles.css'
 


const Radio = (props) => {

    const { options, onChange, activeIndex, style } = props 
    
    return (
        <ul className={style === 'gray' ? 'radioType1' : 'radioType2'}>
            {options && options.map((item, index) => <li className={index === activeIndex ? 'active' : null} onClick={() => onChange(item)}>{item}</li>)}
        </ul>
    )
}

export default Radio 

Radio.propTypes = {
    options: propTypes.arrayOf(propTypes.string),
    onChange: propTypes.func,
    activeIndex: propTypes.number,
    style: propTypes.string 
}

