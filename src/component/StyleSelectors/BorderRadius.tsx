import React from 'react'
import Slider from '@mui/material/Slider'
import { useDispatch } from 'react-redux'
import { applyStyle } from '../../redux/slice'

const BorderRadius = () => {
    const dispatch = useDispatch()
    return (
        <>
        <span>Border radius</span>
        <Slider
            size='small'
            onChange={event => {
                const value = (event.target as HTMLInputElement).value 
                dispatch(applyStyle({
                    key: 'borderRadius',
                    value: value 
                }))
            }}
        />
        </>
    )
}

export default BorderRadius 
