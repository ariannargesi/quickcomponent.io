
import React from 'react'
import {Checkbox} from 'antd'
import { ScriptFormats, StyleFormats } from '../../helper/codeGenerators'
import Radio from '../Radio'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { updateConfig, Config } from '../../redux/slice'
import Box from './Box'
import PropConfig from '../../component/PropConfig'
import styles from './styles.module.sass'
import { ChevronLeft } from 'react-feather'
import { useNavigate } from 'react-router'
const CheckboxGroup = Checkbox.Group;


const hooksList = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo'];


const CompnentConfig = () => {
    const navigate = useNavigate()
    
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);


    const goBack = () => {
        navigate(-1)
    }


    const config = useSelector((state: RootStateOrAny) => state.app.config) as Config 
    const dispatch = useDispatch()
    const handleChange = (key, value) => {
        dispatch(updateConfig({
            key,
            value
        }))
    }

    const onChange = list => {
        dispatch(handleChange('hooksList', list))
      };

    return (
        <div className={styles.container}>

            <ChevronLeft onClick={goBack} />

            <PropConfig 
                onConfirm={value => {handleChange('propsList', value)}}
            />
            <Box title='Do you need a test file?'>
                <Radio
                    style='gray'
                    options={['Yes', 'No']}
                    onChange={(e) => { handleChange('usingTestFile', e === 'Yes' ? true : false) }}
                    activeItem={config.usingTestFile ? 'Yes' : 'No'}
                />
            </Box>
            <Box title='Script language?'>
                <Radio
                    style='gray'
                    options={['Yes', "No, I'm using javascript"]}
                    onChange={(e) => { 
                        handleChange('scriptType', e === 'Yes' 
                        ? ScriptFormats.TS : ScriptFormats.JS) 
                    }}
                    activeItem={config.scriptType === ScriptFormats.TS ? 'Yes' : "No, I'm using javascript"}
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
                    activeItem={config.styleType === StyleFormats.SASS ? 'Yes' :  "No, I'm using CSS"}
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
                    activeItem={config.propDisctruction === true ? 'Yes' : 'No'}
                />
            </Box>
            <Box title='Select your hooks (import statment)'>
                <CheckboxGroup options={hooksList} value={config.hooksList} onChange={onChange} />
            </Box>
        </div>
    )
}

export default CompnentConfig