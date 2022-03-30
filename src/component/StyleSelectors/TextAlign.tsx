import React from 'react'
import { AlignLeft, AlignCenter, AlignRight } from 'react-feather'
import { useDispatch } from 'react-redux'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import { applyStyle } from '../../redux/slice'
import style from './style.module.sass'

const TextAlign = () => {
    const applyStyle = useApplyStyle()
    const textAlign = useStyleValue('textAlign')


    const handleClick = (value) => {
        applyStyle('textAlign', value)
    }

    return (
        <div className={[style.container, style.textAlign].join(' ')}>
            <span className={style.label}>Text align: </span>
            <div className={style.buttons}>
                <AlignLeft
                    onClick={() => handleClick('left')}
                    className={textAlign === 'left' && style.active} />
                <AlignCenter
                    onClick={() => handleClick('center')}
                    className={textAlign === 'center' && style.active} />
                <AlignRight
                    onClick={() => handleClick('right')}
                    className={textAlign === 'right' && style.active} />
            </div>
        </div>
    )
}

export default TextAlign 