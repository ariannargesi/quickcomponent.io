
import React, { useEffect } from 'react'
import {Checkbox} from 'antd'
import { ExportTypes, ScriptFormats, StyleFormats } from '../../helper/codeGenerators'
import Radio from '../Radio'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { updateConfig, Config } from '../../redux/slice'
import Box from './Box'
import PropConfig from '../../component/PropConfig'
import codeGenerators from '../../helper/codeGenerators'


const plainOptions = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo'];
const defaultCheckedList = ['useState'];
const CheckboxGroup = Checkbox.Group;


const CompnentConfig = () => {

    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    const config = useSelector((state: RootStateOrAny) => state.html.config) as Config 
    const dispatch = useDispatch()
    const handleChange = (key, value) => {
        dispatch(updateConfig({
            key,
            value
        }))
    }

    const onChange = list => {
        console.log(list)
        dispatch(handleChange('hooksList', list))
      };

    return (
        <>
            <PropConfig 
                onConfirm={value => {handleChange('propsList', value)}}
            />
            <Box title='Do you need a test file?'>
                <Radio
                    style='gray'
                    options={['Yes', 'No']}
                    onChange={(e) => { handleChange('usingTestFile', e === 'Yes' ? true : false) }}
                    activeIndex={config.usingTestFile ? 0 : 1}
                />
            </Box>
            <Box title='Do you use Typescript?'>
                <Radio
                    style='gray'
                    options={['Yes', "No, I'm using javascript"]}
                    onChange={(e) => { 
                        handleChange('scriptType', e === 'Yes' 
                        ? ScriptFormats.TS : ScriptFormats.JS) 
                    }}
                    activeIndex={config.scriptType === ScriptFormats.TS ? 0 : 1}
                />
            </Box>
            <Box title='Do you use SASS for your styles?'>
                <Radio
                    style='gray'
                    options={['Yes', "No, I'm using CSS"]}
                    onChange={(e) => { 
                        handleChange('styleType', e === 'Yes' 
                        ? StyleFormats.SASS : StyleFormats.CSS)
                     }}
                    activeIndex={config.styleType === StyleFormats.SASS ? 0 : 1}
                />
            </Box>
            <Box title='Do you like props distruction?'>
                <Radio
                    style='gray'
                    options={['Yes', "No"]}
                    onChange={(e) => { 
                        handleChange('propDisctruction', e === 'Yes' 
                        ? true : false)
                     }}
                    activeIndex={config.propDisctruction === true ? 0 : 1}
                />
            </Box>
            <Box title='Select your hooks (import statment)'>
                <CheckboxGroup options={plainOptions} value={config.hooksList} onChange={onChange} />
            </Box>
        </>
    )
}

export default CompnentConfig