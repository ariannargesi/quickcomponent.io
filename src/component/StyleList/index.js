import React, { useState } from 'react'
import StylePanel from '../StylePannel'
import propTypes from 'prop-types'

const StyleList = () => {
    const [state, setState] = useState(null)
    
    return (
       
            <StylePanel searchQuery={state}/>
       
    )
}

const StyleSearch = ({value, onChange}) => {
    return (
        <input style={{width: '250px'}} value={value} onChange={onChange}/>    
    )
}
StyleSearch.propTypes = {
    value: propTypes.string,
    onChange: propTypes.func
}

export default StyleList