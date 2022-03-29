import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.sass'
import Radio from '../Radio'
import { Slider } from 'antd'

const units = ['px', 'rem']

const FontSize = () => {
    const dispatch = useDispatch()
    return (
        <>
        <div className={style.container}>
            <div className={style.top}>
                <span>Width:</span>
                <Radio style={null} options={units} activeIndex={0} onChange={() => {}}/>
            </div>
            <div className={style.body}>
               <input type="number" />
            </div>
        </div>
        </>
    )
}


export default FontSize 