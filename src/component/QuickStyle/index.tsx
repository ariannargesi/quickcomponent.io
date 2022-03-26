import React, { MouseEventHandler, useState } from 'react'
import style from './styles.module.sass'
import { useSelector, useDispatch } from 'react-redux'
import {cssToCamelCase, findNodeInTree} from '../../helper'
import { applyStyle, removeStyle } from '../../redux/slice'
import CssPropertiy from '../../component/CssProperty'
import { selectClasses } from '@mui/material'
import { X } from 'react-feather'

const properties = require('../../data/css-properties.json')

interface ItemProps {
    title: string, 
}

const Item = (props: ItemProps ) => {
    const dispatch = useDispatch()


    const handleRemove = () => {
        const key = props.title.split(':')[0]
       
        dispatch(removeStyle(key))
    }

    // borderRadius: 20px;
    const propertyName = props.title.split(':')[0]
    const propertie = properties[propertyName]
    return (
        <div className={style.container}>
            <div>
                <span>{props.title}</span>
                <X size={12} onClick={handleRemove}/>
            </div>
        </div>
    )
}

function getStyles (key: string, html): any {
    let res  
    findNodeInTree(html, key, (value) => {
        res = value 
    })


    return res.props?.style

}

const QuickStyle: React.FC = () => {
    //@ts-ignore
    const selektedKey = useSelector(state => state.html.selectedKey)
    
    //@ts-ignore 
    const map = useSelector(state => state.html.map)
    const styles = getStyles(selektedKey, map)

    


    if(styles === undefined)
        return <span>You dont have styles at the moment</span>

    
    const keys = Object.keys(styles)
    return (
        <div className='html-tree'>
            { keys && keys.map(key => {
                const name: string = cssToCamelCase(key)
                const value: string = styles[key]
                return <Item title={`${name}:${value}`}/>
            })}
        </div>
    )

}

export default QuickStyle