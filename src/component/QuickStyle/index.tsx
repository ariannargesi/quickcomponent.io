import React, { MouseEventHandler, useState } from 'react'
import styles from './styles.module.sass'
import { useSelector, useDispatch } from 'react-redux'
import { cssToCamelCase, findNodeInTree } from '../../helper'
import { applyStyle, removeStyle } from '../../redux/slice'
import CssPropertiy from '../../component/CssProperty'
import { selectClasses } from '@mui/material'
import { X } from 'react-feather'

const properties = require('../../data/css-properties.json')

interface ItemProps {
    title: string,
}

const Item = (props: ItemProps) => {
    const dispatch = useDispatch()


    const handleRemove = () => {
        const key = props.title.split(':')[0]

        dispatch(removeStyle(key))
    }

    // borderRadius: 20px;
    const propertyName = props.title.split(':')[0]
    const propertie = properties[propertyName]
    return (
        <div className={styles.item}>
            <div>
                <span>{props.title}</span>
                <X size={12} onClick={handleRemove} />
            </div>
        </div>
    )
}

function getStyles(key: string, html): any {
    let res
    findNodeInTree(html, key, (value) => {
        res = value
    })

    if (res.props?.style)
        return res.props.style
    else
        return null

}

const QuickStyle: React.FC = () => {
    //@ts-ignore
    const selektedKey = useSelector(state => state.app.selectedKey)

    //@ts-ignore 
    const map = useSelector(state => state.app.map)
    const stylesList = getStyles(selektedKey, map)

    let keys = []
    if (stylesList) {
        keys = Object.keys(stylesList)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Active styles</h2>
            <div className={styles.content}>
                {keys.length === 0 ? (
                    <span>You dont have any style at the moment</span>
                )
                    :
                    keys.map(key => {
                        const name: string = cssToCamelCase(key)
                        const value: string = stylesList[key]
                        return <Item title={`${name}:${value}`} />
                    })
                }
            </div>
        </div>
    )

}

export default QuickStyle