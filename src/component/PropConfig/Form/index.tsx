import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import isVarName from "is-var-name"
import Select from "../../Select"
import Switch from "../../Switch"
import { Input, Text, Button } from "../../Styled"
import { RootState, ScriptFormats, prop_types } from "../../../types"
import { addProp } from "../../../redux/slice/app"

const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
const Form = () => {
    
    const [errorMessage, setErrorMessage] = useState("")

    const propsList = useSelector((state: RootState) => state.config.propsList)

    const dispatch = useDispatch()
    const scriptType = useSelector(
        (state: RootState) => state.config.scriptType
    )

    const [form, setForm] = useState({
        name: "",
        type: "",
        required: false,
    })

    const handleChange = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                ...e,
            }
        })
    }

    const typesList = (
        scriptType === ScriptFormats.TS ? prop_types.ts : prop_types.js
    ).map((item) => {
        return { value: item, label: item }
    })

    const handleInputChange = (e) => {
        const value = e.target.value.trim()
        const nameAlreadyExist =
            propsList.filter((item) => item.name === value).length > 0
        if (nameAlreadyExist) {
            setErrorMessage(`"${value}" already exist`)
            return
        }
        handleChange({ name: e.target.value })
        const isValidName = isVarName(value)
        if (isValidName) {
            setErrorMessage('')
        } else {
            if (value)
            setErrorMessage("Your prop name must be a valid javascript name")
        }
    }

    const handleAddingProp = () => {
        dispatch(addProp({ value: form }))
        setForm({
            name: "",
            type: "",
            required: false,
        })
    }

    console.log(form)

    return (
        <>
            <FormContainer>
                <div style={{ width: "250px" }}>
                    <Text>Name</Text>
                    <div>
                        <Input value={form.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div>
                    <Text>Type</Text>
                    <div style={{ width: "250px" }}>
                        <Select
                            value={form.type}
                            options={typesList}
                            onChange={(e) => handleChange({ type: e })}
                        />
                    </div>
                </div>
                <div>
                    <Text>Required</Text>
                    <Switch
                        onChange={(value) => handleChange({ required: value })}
                    />
                </div>
                <Button
                    disabled={errorMessage || !form.name || !form.type}
                    onClick={handleAddingProp}
                >
                    Add
                </Button>
            </FormContainer>
            {errorMessage && <Text error>{errorMessage}</Text>}
        </>
    )
}

export default Form
