import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateClassName } from "../../redux/slice/app"
import { Input, Text } from "../Styled/"
import { RootState } from "../../types"
import {
    findNodeInTree,
    generateClassName,
    getParentNode,
    isTextNode,
} from "../../helper"
import styles from "./styles.module.sass"

const UpdateClassname = () => { 
    const selectedKey = useSelector((state: RootState) => {
        return state.selectedKey
    })

    const defaultValue = useSelector((state: RootState) => {
        let res = findNodeInTree(state.map, state.selectedKey)
        if (isTextNode(res))
            res = getParentNode(state.map, state.selectedKey)
        return res.props.className || ""
    })

    const [value, setValue] = useState(defaultValue)

    const dispatch = useDispatch()

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue, selectedKey])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setValue(value)
    }

    const handleBlur = () => {
        dispatch(updateClassName({ value: value || generateClassName('class') }))
    }

    return (
        <div className={styles.container}>
            <Text htmlFor="input">Classname</Text>
            <Input value={value} onChange={handleChange} onBlur={handleBlur} />
        </div>
    )
}

export default UpdateClassname
