import React from 'react'
import { Select } from 'antd'
import { useDispatch } from 'react-redux'
import Slider from '../Slider'
import style from './style.module.sass'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import { getNumbericValue } from '../../helper'
import styles from '../StyleSelectors/style.module.sass'
const options = [
    { value: 'relative', label: 'relative' },
    { value: 'absolute', label: 'absolute' },
    { value: 'static', label: 'static' },
    { value: 'fixed', label: 'fixed' }
]

const Positions = () => {
    const dispatch = useDispatch()
    const applyStyle = useApplyStyle()
    // 3px 

    let position = useStyleValue('position')
    let top = useStyleValue('top')
    let bottom = useStyleValue('bottom')
    let right = useStyleValue('right')
    let left = useStyleValue('left')
    return (
        <div className={styles.container}>
            <span className={style.label}>Position</span>
            <Select
                style={{ width: '120px' }}
                options={options}
                onChange={value => {
                    applyStyle('position', value)
                }}
            />
            {position && (
                <>
                    <div className={style.flex}>
                        <span>Top</span>
                        <div>
                            <Slider
                                value={getNumbericValue(top)}
                                onChange={value => {
                                    applyStyle('top', value + 'px')
                                }} />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Bottom</span>
                        <div>
                            <Slider
                                value={getNumbericValue(bottom)}
                                onChange={value => {
                                    applyStyle('bottom', value + 'px')
                                }} />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Left</span>
                        <div>
                            <Slider
                                value={getNumbericValue(left)}
                                onChange={value => {
                                    applyStyle('left', value + 'px')
                                }} />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Right</span>
                        <div>
                            <Slider
                                value={getNumbericValue(right)}
                                onChange={value => {
                                    applyStyle('right', value + 'px')
                                }} />
                        </div>
                    </div>  
                </>
            )}

        </div>
    )
}

export default Positions 