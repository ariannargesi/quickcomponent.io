import React, { useState } from 'react'
import Slider from "@mui/material/Slider";
import style from './style.module.sass'
import Radio from '../Radio'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle} from '../../redux/slice'
const { Panel } = Collapse;

const removeTwoLastLetters = (str: string): number => {
    
    return Number(str.substring(0, str.length-3))
}


const WidthAndHeight = () => {
    const dispatch = useDispatch()
    const [showMore, setShowMore] = useState(false)

    const marginString = '2px 2px 3px 4px'
    const marginSplit = marginString.split(' ')

    let marginDefaultValues = {
        top: '0px',bottom: '0px', right: '0px', left: '0px'
    }

    if(marginSplit.length === 1){
        const m = marginSplit[0]
        marginDefaultValues = {
            top: m,
            bottom: m,
            left: m,
            right: m
        }
    }

    else if(marginSplit.length == 2){
        marginDefaultValues = {
            top: marginSplit[0],
            bottom: marginSplit[0],
            left: marginSplit[1],
            right: marginSplit[1]
        }
    } 

    else if(marginSplit.length == 4){
        marginDefaultValues = {
            top: marginSplit[0],
            bottom: marginSplit[1],
            left: marginSplit[2],
            right: marginSplit[3]
        }
    } 
    const handleToggle = () => setShowMore(!showMore)

    const handleChange = (direction: string, value: string ) => {
        let finalValue = null 
        switch(direction){
            case 'all':
                finalValue = value + 'px'
                break
            case 'top':
                marginDefaultValues.top = value + 'px'
                break 
            case 'right':
                marginDefaultValues.right = value + 'px'
                break 
            case 'bottom':
                marginDefaultValues.bottom = value + 'px'
                break 
            case 'left':
                marginDefaultValues.left = value + 'px'
        }

        let finalMargin 
        if(finalValue)
            finalMargin = finalValue 
        else finalMargin = `
        ${marginDefaultValues.top} ${marginDefaultValues.right} ${marginDefaultValues.bottom} ${marginDefaultValues.left}`

        dispatch(applyStyle({
            key: 'margin',
            value: finalMargin 
        }))

    }

    return (
        <>
            <div className={style.container}>
                <div className={style.top}>
                    <span>Margin:</span>
                </div>
                <div className={style.body}>
                    <Slider
                        size={"small"}
                        defaultValue={marginSplit.length === 0 ? removeTwoLastLetters(marginSplit[0]) : 0}
                        max={500}
                        aria-label={"Small"}
                        valueLabelDisplay={"auto"}
                        onChange={({target}) => {
                            const value = (target as HTMLInputElement).value 
                            handleChange('all', value)
                        }}
                    />
                </div>
                <div className={style.footer} onClick={handleToggle}>
                    <span>more</span>
                    {showMore ? <ChevronDown /> : <ChevronUp />}
                </div>
                {showMore && (
                    <>
                    <div className={style.flex}>
                        <span>Top</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={removeTwoLastLetters(marginDefaultValues.top)}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={({target}) => {
                                    const value = (target as HTMLInputElement).value 
                                    handleChange('top', value)
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Left</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={removeTwoLastLetters(marginDefaultValues.left)}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={({target}) => {
                                    const value = (target as HTMLInputElement).value 
                                    handleChange('right', value)
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Right</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={removeTwoLastLetters(marginDefaultValues.right)}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={({target}) => {
                                    const value = (target as HTMLInputElement).value 
                                    handleChange('right', value)
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Bottom</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={removeTwoLastLetters(marginDefaultValues.bottom)}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={({target}) => {
                                    const value = (target as HTMLInputElement).value 
                                    handleChange('bottom', value)
                                }}
                            />
                        </div>
                    </div>
                    </>
                )}
            </div>
        </>
    )
}

export default WidthAndHeight