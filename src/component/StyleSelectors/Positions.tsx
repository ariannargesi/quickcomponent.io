import React from 'react'
import { Select } from 'antd'
import { useDispatch } from 'react-redux'
import Slider from "@mui/material/Slider"
import style from './style.module.sass'
import { applyStyle } from '../../redux/slice'

const options = [
    {value: 'relative', label: 'relative'},
    {value: 'absolute', label: 'absolute'},
    {value: 'static', label: 'static'},
    {value: 'fixed', label: 'fixed'}
]

const Positions = () => {
    const dispatch = useDispatch()

    let position = 'absolute'

    return (
        <div style={{width: '100%'}}>
            <span className={style.label}>Position</span>
            <Select
                style={{width: '120px'}}
                defaultValue={'static'}
                options={options}
                onChange={value => {
                    dispatch(applyStyle({
                        key: 'position',
                        value: value 
                    }))
                }}
            />
            {position === 'absolute' && (
                <>
                    <div className={style.flex}>
                        <span>Top</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={0}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={e => {
                                    //@ts-ignore 
                                    const value = e.target.value 
                                    dispatch(applyStyle({
                                        key: 'top',
                                        value: value 
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Bottom</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={0}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={e => {
                                    //@ts-ignore 
                                    const value = e.target.value 
                                    dispatch(applyStyle({
                                        key: 'bottom',
                                        value: value 
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Left</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={0}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={e => {
                                    //@ts-ignore 
                                    const value = e.target.value 
                                    dispatch(applyStyle({
                                        key: 'left',
                                        value: value 
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.flex}>
                        <span>Right</span>
                        <div>
                            <Slider
                                size={"small"}
                                defaultValue={0}
                                max={500}
                                aria-label={"Small"}
                                valueLabelDisplay={"auto"}
                                onChange={e => {
                                    //@ts-ignore 
                                    const value = e.target.value 
                                    dispatch(applyStyle({
                                        key: 'right',
                                        value: value 
                                    }))
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Positions 