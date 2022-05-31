import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { ChevronLeft } from "react-feather"
import Radio from "../Radio"
import { updateConfig } from "../../redux/slice/app"
import { RootState } from "../../types"
import Box from "./Box"
import { ScriptFormats, StyleFormats } from "../../types"
import PropConfig from "../PropConfig"
import styles from "./styles.module.sass"
import styled from "styled-components"
import { Label, Text } from "../Styled"
import { style } from "@mui/system"
import { useEffect, useRef, useState } from "react"
import { scrollBarStyle } from "../Styled"
const Container = styled.div`
    background: white;
    width: 50%;
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
            <PropConfig
                onConfirm={(value) => {
                    handleChange("propsList", value)
                }}
            />
            <Box title="Do you need a test file?">
                <Radio
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
                {/* <CheckboxGroup
                    options={hooksList}
                    value={config.hooksList}
                    onChange={handleHooksListChange}
                /> */}
                <HooksConfig onChange={value => {
                    
                    dispatch(handleChange("hooksList", value))  
                  }}/>
            </Box>
        </Container>
    )
}

const In = styled.input`
    height: 20px;
    width: 20px;
`
const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`

const Checkbox = (props) => {
    const [state, setState] = useState(false)

    const { label, id } = props

    const toggle = () => {
        setState(!state)
        props.onChange(state)
    }

    return (
        <CheckboxContainer onClick={toggle}>
            <In type="checkbox" id={id} checked={state} />
            <Label htmlFor={id} style={{ paddingLeft: "8px" }}>
                {label}
            </Label>
        </CheckboxContainer>
    )
}

const hooksList = ["useState", "useEffect", "useRef", "useCallback", "useMemo"]

const HooksConfig = (props: {onChange}) => {
    const [list, setList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateConfig({key: 'hooksList', value: list}))
    }, [list])

    return (
        <div>
            {hooksList.map((item) => {
                return (
                    <Checkbox
                        label={item}
                        key={item}
                        id={item}
                        onChange={() => {
                            if(list.indexOf(item) < 0)
                                setList((prev) => [...prev, item])
                            else setList(prev => prev.filter(el => el!= item))


                        }}
                    />
                )
            })}
        </div>
    )
}

export default CompnentConfig
