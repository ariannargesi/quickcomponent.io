import{ useSelector } from 'react-redux'
import arrayToComponent from '../../helper/arrayToComponent'
import React from 'react'

const ComponentView = () => {
    const html = useSelector(state => state.app.map)
    const component = arrayToComponent(html)

    return (
        <div style={{
           padding: '16px',
           height: '100%',
           display: 'flex',
           flex: '1',
           flexDirection: 'column',
           overflow: 'hidden'
        }}>
            <h2>Component view</h2>
            <div style={{height: '100%',     overflow: 'scroll', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px'}}>
                {component}
            </div>
        </div>
    )
}

export default ComponentView 