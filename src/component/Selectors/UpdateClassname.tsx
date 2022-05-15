import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateClassName } from "../../redux/slice/app"
import { Input } from "antd"
import { RootState } from "../../types"
import { findNodeInTree, generateClassName } from "../../helper"
import styles from "./styles.module.sass"

const UpdateClassname = () => {
    const defaultValue = useSelector((state: RootState) => {
        return findNodeInTree(state.map, state.selectedKey).props.className
    })

    const [value, setValue] = useState(defaultValue)

    const dispatch = useDispatch()

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setValue(value)
    }

    const handleBlur = () => {
        dispatch(updateClassName({ value: value || generateClassName() }))
    }

    return (
        <div className={styles.container}>
            <label htmlFor="input">Classname</label>
            <Input value={value} onChange={handleChange} onBlur={handleBlur} />
        </div>
    )
}

export default UpdateClassname
