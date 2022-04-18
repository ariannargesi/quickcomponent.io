import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateClassName } from '../../redux/slice/app'
import { Input } from 'antd'
import styles from './styles.module.sass'
import { RootState } from '../../types'
import { findNodeInTree, findNodeText } from '../../helper'

function getClassName (map, key) {
    let res 
    findNodeInTree(map, key, value => {
        console.log(value)
        res = value.props.className   
    })
    return res
}

const UpdateClassname = () => {
    const dispatch = useDispatch()
    const {map, selectedKey} = useSelector((state: RootState) => state.app)
    const [value, setValue] = useState(getClassName(map, selectedKey))
   
    console.log('This is updating: ' + value);
   
        useEffect(() => {
            setValue(getClassName(map, selectedKey))
        }, [selectedKey])


    const className = '' // read it from redux 

    const handleOnBlur = () => {
        dispatch(updateClassName({value: value}))
    }

    return (
        <div className={[styles.container, styles.flex].join(' ')}>
            <label>Class name</label>
            <Input 
                style={{width: '60%'}}
                value={value}
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value)
                }}
                onBlur={handleOnBlur}
            />
        </div>
    )
}

export default UpdateClassname