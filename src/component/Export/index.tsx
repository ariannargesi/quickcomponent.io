import React from 'react'
import CodeView from '../CodeView'
import ComponentConfig from '../CompnentConfig'




const Export = (props: any) => {
        
    return (
        <>
            <h1 style={{ fontSize: '30px' }}>Component settings</h1>
            <div className='pure-g' style={{ width: '1200px', margin: '0 scroll' }} >
                <div className='pure-u-1-2 layout' style={{ height: '700px', overflow: 'auto' }}>
                    <ComponentConfig/>
                </div>
                <div className='pure-u-1-2'>
                    <CodeView/>
                </div>
            </div>
        </>
    )
}

export default Export


