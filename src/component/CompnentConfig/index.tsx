import React from 'react'
import { ExportTypes, ScriptFormats, StyleFormats } from '../../helper/codeGenerators'
import Radio from '../Radio'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { updateConfig } from '../../redux/slice'
import Box from './Box'

const CompnentConfig = () => {

    const config = useSelector((state: RootStateOrAny) => state.html.config)
    const dispatch = useDispatch()
    const handleChange = (key, value) => {
        dispatch(updateConfig({
            key,
            value
        }))
    }

    return (
        <>
            <Box title='Do you need a test file?'>
                <Radio
                    style='gray'
                    options={['Yes', 'No']}
                    onChange={(e) => { handleChange('testFile', e === 'Yes' ? true : false) }}
                    activeIndex={config.testFile ? 0 : 1}
                />
            </Box>
            <Box title='Do you use Typescript?'>
                <Radio
                    style='gray'
                    options={['Yes', "No, I'm using javascript"]}
                    onChange={(e) => { 
                        handleChange('script', e === 'Yes' 
                        ? ScriptFormats.TS : ScriptFormats.JS) 
                    }}
                    activeIndex={config.script === ScriptFormats.TS ? 0 : 1}
                />
            </Box>
            <Box title='Do you use SASS for your styles?'>
                <Radio
                    style='gray'
                    options={['Yes', "No, I'm using CSS"]}
                    onChange={(e) => { 
                        handleChange('style', e === 'Yes' 
                        ? StyleFormats.SASS : StyleFormats.CSS)
                     }}
                    activeIndex={config.style === StyleFormats.SASS ? 0 : 1}
                />
            </Box>
            <Box title='Do you like default export or named export?'>
                <Radio
                    style='gray'
                    options={['Default export', "Named export"]}
                    onChange={(e) => { 
                        handleChange('exportType', e === 'Default export' 
                        ? ExportTypes.Default : ExportTypes.Named)
                    }}
                    activeIndex={config.exportType === ExportTypes.Default ? 0 : 1}
                />
            </Box>
        </>
    )
}

export default CompnentConfig