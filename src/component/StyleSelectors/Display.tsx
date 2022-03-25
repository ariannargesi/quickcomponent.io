import React from 'react'
import style from './style.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle } from '../../redux/slice'
import Select from '../Select'




const displayOptions = [
    { label: 'inline-block', value: 'inline-block' },
    { label: 'block', value: 'block' },
    { label: 'flex', value: 'flex' },
    { label: 'none', value: 'none' }
]

const flexDirectionOptions = [
    { label: 'row', value: 'row' },
    { label: 'column', value: 'column' },
    { label: 'row-reverse', value: 'row-reverse' },
    { label: 'column-reverse', value: 'column-reverse' }
]

const alignItemsOptions = [
    { label: 'center', value: 'center' }
]

const justifyContentOptions = [
    { label: 'space-between', value: 'space-between' },
    { label: 'space-around', value: 'space-around' },
    { label: 'spcece-evenly', value: 'space-evenly' }
]



const Display = () => {
    const dispatch = useDispatch()

    const display = 'flex'

    const handleChange = (key, value) => {
        dispatch(applyStyle({
            key,
            value
        }))
    }

    return (
        <>
            <Select
                label='Display'
                options={displayOptions}
                onChange={value => handleChange('display', value)}
            />
            {display === 'flex' && (
                <>
                    <Select
                        label='Flex direction'
                        options={flexDirectionOptions}
                        onChange={value => handleChange('flexDirection', value)}
                    />
                    <Select
                        label='Justify content'
                        options={justifyContentOptions}
                        onChange={value => handleChange('justifyContent', value)}
                    />

                    <Select
                        label='Align items'
                        options={alignItemsOptions}
                        onChange={value => handleChange('AlignItems', value)}
                    />
                </>
            )}
        </>
    )
}


export default Display 