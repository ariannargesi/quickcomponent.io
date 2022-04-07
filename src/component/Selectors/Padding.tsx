import React, { useState } from 'react'
import Slider from "../Slider";
import style from './styles.module.sass'
import Radio from '../Radio'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle } from '../../redux/slice/app'
import useApplyStyle from '../../hooks/useApplyStyle'
import useStyleValue from '../../hooks/useStyleValue'
import { getNumbericValue } from '../../helper'



const Padding = () => {
    const dispatch = useDispatch()
    const applyStyle = useApplyStyle()
    const [showMore, setShowMore] = useState(false)

    const marginString = useStyleValue('padding') || '0px'
    let marginSplit = marginString.split(' ')




    let marginDefaultValues = {
        top: '0px', bottom: '0px', right: '0px', left: '0px'
    }

    if (marginSplit.length === 1) {
        const m = marginSplit[0]
        marginDefaultValues = {
            top: m,
            bottom: m,
            left: m,
            right: m
        }
    }

    else if (marginSplit.length == 2) {
        marginDefaultValues = {
            top: marginSplit[0],
            bottom: marginSplit[0],
            left: marginSplit[1],
            right: marginSplit[1]
        }
    }

    else if (marginSplit.length == 4) {
        marginDefaultValues = {
            top: marginSplit[0],
            right: marginSplit[1],
            bottom: marginSplit[2],
            left: marginSplit[3]
        }
    }
    const handleToggle = () => setShowMore(!showMore)

    const handleChange = (direction: string, value: number) => {
        let finalValue = null
        switch (direction) {
            case 'all':
                finalValue = value + 'px'
                break
            case 'right':
                marginDefaultValues.right = value + 'px'
                break 
            case 'top':
                marginDefaultValues.top = value + 'px'
                break
            case 'bottom':
                marginDefaultValues.bottom = value + 'px'
                break
            case 'left':
                marginDefaultValues.left = value + 'px'
        }

        let finalMargin
        if (finalValue)
            finalMargin = finalValue
        else finalMargin = `${marginDefaultValues.top} ${marginDefaultValues.right} ${marginDefaultValues.bottom} ${marginDefaultValues.left}`
        applyStyle('padding', finalMargin)
    }

    return (
        <>
            <div className={style.container}>
                <Slider
                    label='Padding'
                    value={marginSplit.length === 1 ? getNumbericValue(marginSplit[0]) : 0}
                    onChange={(value) => {
                        handleChange('all', value)
                    }}
                />
                <div className={style.alignCenter} onClick={handleToggle}>
                    <span>more</span>
                    {showMore ? <ChevronDown /> : <ChevronUp />}
                </div>
                {showMore && (
                    <div className={style.content}>
                        <Slider
                            labelInline
                            label='Top'
                            value={getNumbericValue(marginDefaultValues.top)}
                            onChange={(value) => {
                                handleChange('top', value)
                            }}
                        />
                        <Slider
                            labelInline
                            label='Right'
                            value={getNumbericValue(marginDefaultValues.right)}
                            onChange={(value) => {
                                handleChange('right', value)
                            }}
                        />
                        <Slider
                            labelInline
                            label='Bottom'
                            value={getNumbericValue(marginDefaultValues.bottom)}
                            onChange={(value) => {
                                handleChange('bottom', value)
                            }}
                        />
                        <Slider
                            labelInline
                            label='Left'
                            value={getNumbericValue(marginDefaultValues.left)}
                            onChange={(value) => {
                                handleChange('left', value)
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Padding 