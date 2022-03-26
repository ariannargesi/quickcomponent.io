import{ useSelector } from 'react-redux'
import arrayToComponent from '../../helper/arrayToComponent'
import React from 'react'

const ComponentView = () => {
    const html = useSelector(state => state.html.map)
    const component = arrayToComponent(html)

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {component}
        </div>
    )
}

export default ComponentView 