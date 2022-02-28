import React, { Children, useEffect, useState } from 'react'
import CodeView from '../CodeView'
import { Radio, Checkbox, Divider, Input, Button, Modal } from 'antd';
import { ExportTypes, ScriptFormats, StyleFormats, getImportStyle, getImport, getMainComponent } from '../../helper/codeGenerators'
import { defaultProps } from 'react-select/dist/declarations/src/Select';
import { Plus, Trash } from 'react-feather'
const CheckboxGroup = Checkbox.Group;

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



const plainOptions = ['useState', 'useEffect', 'useRef'];


const Export = (props: any) => {

    const [state, setState] = useState({
        styleFormat: StyleFormats.SASS,
        scriptFormat: ScriptFormats.JS,
        exportType: ExportTypes.Named,
    })


    const [visible, setVisible] = useState(false);

    const [propsList, setPropsList] = useState([])

    const [inputs, setInput] = useState({
        fileName: 'App',
        componentName: 'App',
        styleName: 'style'
    })


    const [code, setCode] = React.useState('')

    const add = (str: string): void => {
        setCode(code + str + '\n')

    }

    useEffect(() => {
        add(getImport(''))
        add(getImportStyle(StyleFormats.SASS, 'style'))
        add(getMainComponent(ExportTypes.Default, ScriptFormats.JS, [], 'App'))
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
                    <Modal
                        title="Config props"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        footer={false}
                        onCancel={() => setVisible(false)}
                        width={600}
                    >
                        <PropConfig onConfirm={(value) => {}}/>
                    </Modal>

                </div>
                <div className='pure-u-1-2'>
                    <CodeView code={code} />
                </div>
            </div>
        </>
    )
}

export default Export


