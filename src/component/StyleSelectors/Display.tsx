import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { applyStyle } from '../../redux/slice'
import Select from '../Select'
import useStyleValue from '../../hooks/useStyleValue'
import styles from '../StyleSelectors/style.module.sass'



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

    const display = useStyleValue('display')
    const alignItems = useStyleValue('alignItems')
    const justifyContent = useStyleValue('justifyContent')
    const flexDirection = useStyleValue('flexDirection')
    const handleChange = (key, value) => {
        dispatch(applyStyle({
            key,
            value
        }))
    }

    return (
        <div className={styles.container}>
            <Select
                label='Display'
                options={displayOptions}
                value={display}
                onChange={value => handleChange('display', value)}
            />
            {display === 'flex' && (
                <div style={{marginLeft: '8px', paddingLeft: '8px', borderLeft:'1px solid darkgray'}}>
                    <Select
                        label='Flex direction'
                        value={flexDirection}
                        options={flexDirectionOptions}
                        onChange={value => handleChange('flexDirection', value)}
                    />
                    <Select
                        label='Justify content'
                        value={justifyContent}
                        options={justifyContentOptions}
                        onChange={value => handleChange('justifyContent', value)}
                    />

                    <Select
                        label='Align items'
                        value={alignItems}
                        options={alignItemsOptions}
                        onChange={value => handleChange('alignItems', value)}
                    />
                </div>
            )}
        </div>
    )
}


export default Display 