import React from 'react'
import { useSelector } from 'react-redux'
import arrayToComponent from '../../helper/arrayToComponent'
import { RootState } from '../../redux'

const ComponentView = () => {
    const html = useSelector((state: RootState) => state.app.map)
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
            {/* allow scroll when compnent get big
                while users can see component title */}
            <div style={{ overflow: 'scroll', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {component}
            </div>
        </div>
    )
}

export default ComponentView 