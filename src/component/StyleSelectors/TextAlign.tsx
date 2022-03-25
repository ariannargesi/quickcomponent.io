import React from 'react'
import { AlignLeft, AlignCenter, AlignRight } from 'react-feather'
import { useDispatch } from 'react-redux'
import { applyStyle } from '../../redux/slice'
import style from './style.module.sass'

const TextAlign = () => {
    const dispatch = useDispatch()
    let defaultValue  
    

    const handleClick = (value) => {
        dispatch(applyStyle({
            key: 'textAlign',
            value: value 
        }))
    }

    return (
        <div className={style.textAlign}>
            <span className={style.label}>Text align: </span>
            <div className={style.buttons}>
                <AlignLeft 
                onClick={() => handleClick('left')}
                className={defaultValue === 'left' && style.active}/>
                <AlignCenter 
                onClick={() => handleClick('center')}
                 className={defaultValue === 'center' && style.active}/>
                <AlignRight
                onClick={() => handleClick('right')}
                 className={defaultValue === 'right' && style.active}/>
            </div>
        </div>
    )
}

export default TextAlign 