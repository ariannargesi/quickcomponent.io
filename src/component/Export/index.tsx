import React, { useEffect, useState } from 'react'
import CodeView from '../CodeView'
import {Checkbox } from 'antd';
import generateCode, { ExportTypes, ScriptFormats, StyleFormats } from '../../helper/codeGenerators'
import { useSelector } from 'react-redux'
import RadioF from '../Radio'
import PropConfig from '../PropConfig';
interface BoxProp {
    children: React.ReactNode,
    title: string 
}

const Box = (props: BoxProp) => {

    const style = {
        container: {
            padding: '15px 15px 10px 0',
        },
        title: {
            marginRight: '20px'
        }
    }


   return (
    <div style={style.container}>
        <h2 style={style.title}>{props.title}</h2>
        {props.children}
    </div>
   )
}

const Export = (props: any) => {

    const [code, setCode] = React.useState('')

    const [state, setState] = useState({
        styleFormat: StyleFormats.SASS,
        scriptFormat: ScriptFormats.JS,
        exportType: ExportTypes.Named,
        propsList: []
    })

    const [inputs, setInput] = useState({
        fileName: 'App',
        componentName: 'App',
        styleName: 'style'
    })

       // @ts-ignore: Unreachable code error
    const map = useSelector(state => state.html.map)

    useEffect(() => {
        const code = generateCode(state, map)
        setCode(code)
    }, [])
    return (
        <>
            <h1 style={{ fontSize: '30px' }}>Component settings</h1>
            <div className='pure-g' style={{ width: '1200px', margin: '0 scroll' }} >

                <div className='pure-u-1-2 layout' style={{ height: '700px', overflow: 'auto' }}>
                    <Box title='Do you need a test file'>
                        <RadioF
                            style='gray' 
                            list={['Yes', 'No']} 
                            onChange={() => { }} 
                            active={'Yes'}
                        />        
                    </Box>
                </div>
                <div className='pure-u-1-2'>
                    <CodeView code={code} />
                </div>
            </div>
        </>
    )
}

export default Export


