import React, { Children, useEffect, useState } from 'react'
import CodeView from '../CodeView'
import { Radio, Checkbox, Divider, Input, Button } from 'antd';
import { ExportTypes, ScriptFormats,StyleFormats } from '../../helper/CodeGenerator'
import { defaultProps } from 'react-select/dist/declarations/src/Select';
import {Plus, Trash} from 'react-feather'
const CheckboxGroup = Checkbox.Group;
import RadioF from '../Radio'
interface BoxProp {
    children: React.ReactNode
}

const Box = (props: BoxProp) => {
    return (
        <div style={{
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee',
            padding: '20px'
        }}>
            {props.children}
        </div>
    )
}

interface AddPropsProp {
    onChange: any 
}

const AddProps = (props: AddPropsProp) => {
    let name 
    let type 
    let defaultValue 

    const confirm = () => {
        props.onChange({
            name, type, defaultValue
        })
    }

    return (
        <div style={{display: 'flex'}}>
            <div>
                <label htmlFor="name">Name</label>
                <Input onChange={e => name = e.target.value}/>
            </div>
            <div>
                <label htmlFor="type">Type?(optional)</label>
                <Input onChange={e => type = e.target.value}/>
            </div>
            <div>
                <label htmlFor="defaultValue">Default value?(optional)</label>
                <Input onChange={e => defaultValue = e.target.value}/>
            </div>
            <Button onClick={confirm}>Okay</Button>
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

    const [propsList, setPropsList] = useState([])

    const [inputs, setInput] = useState({
        fileName: 'App',
        componentName: 'App',
        styleName: 'style'
    })
    
    // const handleChange = (e, name) => {
    //     setInput({...prev, name: e.target.value})
    // } 
    
    
    const [showPropsInputs, setShowPropsInputs] = useState(false)
    const [checkedList, setCheckedList] = React.useState([]);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);
    const [codeMap, setCodeMap] = React.useState([])


    const add = (x:string): void => {
        setCodeMap(prev => [...prev, x])
    }

    const putInPlace = (x: string, y: string): void => {

    }

    
    const styleOptions = [
        { label: 'CSS', value: 'CSS' },
        { label: 'SASS', value: 'SASS' },
    ];

    const exportOptions = [
        { label: 'default', value: 'default' },
        { label: 'named', value: 'named' },
    ];

    const scriptOptions = [
        { label: 'Yes', value: 'Javascript' },
        { label: 'No', value: 'Typescript' },
    ];

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const toggleShowPropsInputs = () => {
        setShowPropsInputs(!showPropsInputs)
    }

    const handleAddProp = (value) => {
        console.log('So im running')
        setPropsList(prev => [...prev, value])
    }

    const handleDeleteProp = (num) => {
        setPropsList(list => list.filter((item, index) => index != num ))
    }

    useEffect(() => {
        
        
    }, [])

    return (
        <>
        <h1 style={{fontSize:'30px'}}>Component settings</h1>
        <div className='pure-g' style={{width: '1200px', margin: '0 auto'}} >
                
                <div className='pure-u-1-2 layout' style={{ height: '700px',overflow:'auto'}}>
                    <div style={{padding: '15px 0', paddingLeft: '10px'}}>
                    <h2 style={{marginRight: "20px"}}>Do you need a test file?</h2>
                    {/* <Radio.Group style={{marginLeft: '20px'}}
                    size='large'
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                     */}
                     <RadioF list={['Yes', 'No']} onChange={() => {}} active={0} />
                    </div>
                    <div style={{width: '95%', height: '1px', background: "#eee", float: 'left'}}></div>
                    <div style={{padding: '15px 0', paddingLeft: '10px'}}>
                    <h2 style={{marginRight: "20px"}}>Do you use Typescript?</h2>
                    <Radio.Group style={{marginLeft: '20px'}}
                    size='large'
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                    </div>
                    <div style={{width: '95%', height: '1px', background: "#eee", float: 'left'}}></div>
                    <div style={{padding: '15px 0', paddingLeft: '10px'}}>
                    <h2 style={{marginRight: "20px"}}>Do you use SASS or CSS?</h2>
                    <Radio.Group style={{marginLeft: '20px'}}
                    size='large'
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                    </div>
                    <div style={{width: '95%', height: '1px', background: "#eee", float: 'left'}}></div>
                    
                
                    <div style={{padding: '15px 0', paddingLeft: '10px'}}>
                    <h2 style={{marginRight: "20px"}}>Select export type for your component </h2>
                    <Radio.Group style={{marginLeft: '20px'}}
                    size='large'
                        options={['Named export', 'Default Export']}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                    </div>
                    <div style={{width: '95%', height: '1px', background: "#eee", float: 'left'}}></div>

                {/* <Box>
                    <h2>1-Select your script language</h2>
                    <Radio.Group
                    size='large'
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                </Box>
                <Box>
                    <h2>1-Select your script language</h2>
                    <Radio.Group
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                </Box>
                <Box>
                    <h2>1-Select your script language</h2>
                    <Radio.Group
                        options={scriptOptions}
                        // value={scriptLang}
                        buttonStyle="solid"
                        // onChange={e => { setScriptLang(e.target.value) }}
                    />
                </Box> 
                <Box>
                    <h2>2-Select your style language</h2>
                    <Radio.Group
                        options={styleOptions}
                        // value={styleLang}
                        buttonStyle="solid"
                        // onChange={e => { setStyleLang(e.target.value) }}
                    />
                </Box>
                <Box>
                    <h2>3-Import Hooks?</h2>

                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <Divider />
                    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />


                </Box>
                <Box>
                    <h2>3-Default export or named export?</h2>
                    
                    <Radio.Group
                        options={exportOptions}
                        // value={exportType}
                        optionType="button"
                        buttonStyle="solid"
                        // onChange={e => { setExportType(e.target.value) }}
                    />
                </Box>
                <Box>
                    <h2>5-Props List <Plus color='lightgreen' onClick={toggleShowPropsInputs}/> </h2>
                    {propsList.length === 0 ? 'No props' : (
                        <div>
                            {propsList.map((item, index) => {
                                return (
                                    <div>
                                        <span>{item.name} | {item.type} | {item.defaultValue}</span>
                                        <Trash onClick={() => handleDeleteProp(index)}/>
                                    </div> 
                                )
                            })}
                        </div>
                    )}
                    {showPropsInputs && <AddProps onChange={value => handleAddProp(value)}/>} */}
                {/* </Box> */}
            </div>
            {/* <div className='pure-u-1-2'>
                <CodeView source={codeMap} />
            </div> */}
        </div>
        </>
    )
}

export default Export 



// map.add('impr')
// map.add('$useState')
// map.add('#jsx')
// map.add('#props')
