import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { ChevronLeft } from "react-feather"
import Radio from "../Radio"
import { addHook, removeHook, updateConfig } from "../../redux/slice/app"
import { RootState } from "../../types"
import Box from "./Box"
import { ScriptFormats, StyleFormats } from "../../types"
import PropConfig from "../PropConfig"
import styled from "styled-components"
import { Label } from "../Styled"
import { scrollBarStyle } from "../Styled"

const Container = styled.div`
    background: white;
    width: 50vw;
    box-shadow: 0px -5px 100px -3px rgba(0,0,0,0.1);
    padding: 0 16px;
    height: 100vh;
    overflow: auto;
    ${scrollBarStyle}
`

const CompnentConfig = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const config = useSelector((state: RootState) => state.config)

    const goBack = () => {
        navigate(-1)
    }

    const handleChange = (key, value) => {
        dispatch(
            updateConfig({
                key,
                value,
            })
        )
    }

    return (
        <Container>
            <ChevronLeft onClick={goBack} style={{margin: '16px 0'}} />
            <PropConfig/>
            <Box title="Do you need a test file?">
                <Radio
                    large 
                    type="gray"
                    options={["Yes", "No"]}
                    onChange={(e) => {
                        handleChange(
                            "usingTestFile",
                            e === "Yes" ? true : false
                        )
                    }}
                    activeItem={config.usingTestFile === true ? "Yes" : "No"}
                />
            </Box>
            <Box title="Do you use typescript for your scripts?">
                <Radio
                    large
                    type="gray"
                    options={["Yes", "No, I'm using javascript"]}
                    onChange={(e) => {
                        handleChange(
                            "scriptType",
                            e === "Yes" ? ScriptFormats.TS : ScriptFormats.JS
                        )
                    }}
                    activeItem={
                        config.scriptType === ScriptFormats.TS
                            ? "Yes"
                            : "No, I'm using javascript"
                    }
                />
            </Box>
            <Box title="Do you use SASS for your styles?">
                <Radio
                    large
                    type="gray"
                    options={["Yes", "No, I'm using CSS"]}
                    onChange={(e) => {
                        handleChange(
                            "styleType",
                            e === "Yes" ? StyleFormats.SASS : StyleFormats.CSS
                        )
                    }}
                    activeItem={
                        config.styleType === StyleFormats.SASS
                            ? "Yes"
                            : "No, I'm using CSS"
                    }
                />
            </Box>
            <Box title="Do you like props distruction?">
                <Radio
                    large 
                    type="gray"
                    options={["Yes", "No"]}
                    onChange={(e) => {
                        handleChange(
                            "propDisctruction",
                            e === "Yes" ? true : false
                        )
                    }}
                    activeItem={config.propDisctruction === true ? "Yes" : "No"}
                />
            </Box>
            <Box title="Select your hooks (import statment)">
                <HooksConfig />
            </Box>
        </Container>
    )
}

const Input = styled.input`
    height: 20px;
    width: 20px;
`
const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0;
`

const Checkbox = (props) => {
    const { label, id, value, onChange } = props
    
    const toggle = () => {
        onChange(!value)        
    }

    return (
        <CheckboxContainer>
            <Input type="checkbox" id={id} checked={value} onChange={toggle} />
            <Label htmlFor={id} style={{ paddingLeft: "8px" }}>
                {label}
            </Label>
        </CheckboxContainer>
    )
}

const hooksList = ["useState", "useEffect", "useRef", "useCallback", "useMemo"]

const HooksConfig = () => {


    const dispatch = useDispatch()

    const alreadySelectedHooks = useSelector((state: RootState) => state.config.hooksList)

    console.log('Render: ' + alreadySelectedHooks)

    const handleAdd = (value) => {
        dispatch(addHook(value))
    }

    const handleRemove = (value) => {
        dispatch(removeHook(value))
    }

    return (
        <div>
            {hooksList.map((item) => {
                return (
                    <Checkbox
                        value={alreadySelectedHooks.indexOf(item) >= 0}
                        label={item}
                        key={item}
                        id={item}
                        onChange={value => {
                            if(value)
                                handleAdd(item)                
                            else 
                                handleRemove(item)

                        }}
                    />
                )
            })}
        </div>
    )
}

export default CompnentConfig
