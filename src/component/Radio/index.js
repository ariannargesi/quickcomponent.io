import React from 'react'
import propTypes from 'prop-types'
import './styles.css'
 


const Radio = (props) => {

    const { list, onChange, active, style } = props 
    
    return (
        <ul className={style === 'gray' ? 'radioType1' : 'radioType2'}>
            {list && list.map((item, index) => <li className={item === active ? 'active' : null} onClick={() => onChange(item)}>{item}</li>)}
        </ul>
    )
}

export default Radio 

Radio.propTypes = {
    list: propTypes.arrayOf(propTypes.string),
    onChange: propTypes.func,
    active: propTypes.number,
    style: propTypes.string
}

