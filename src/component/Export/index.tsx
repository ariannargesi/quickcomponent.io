import React from 'react'
import CodeView from '../CodeView'
import ComponentConfig from '../CompnentConfig'

//1-test file
// if user need a test file just add a new file to download output. 
//if user use typescript, file name must be [component name].test.ts 
//if user use javascript name must be [component name].test.js

//2-script type
// if user use typescript file extention must be tsx and component must have type of React.Node 
// if user use javascript file extension must be js and just return a basic js component 





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


