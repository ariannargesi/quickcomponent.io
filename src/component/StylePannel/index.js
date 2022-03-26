import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle } from '../../redux/slice'
import { cssToCamelCase } from '../../helper'
import WidthAndHeight from '../StyleSelectors/WidthAndHeight'
import MarginAndPadding from '../StyleSelectors/MarginAndPadding'
import BoxShadow from '../StyleSelectors/BoxShadow'
import Positions from '../StyleSelectors/Positions'
import Colors from '../StyleSelectors/Colors'
import ColorPicker from '../ColorPicker'
import BorderRadius from '../StyleSelectors/BorderRadius'
import TextAlign from '../StyleSelectors/TextAlign'
import Display from '../StyleSelectors/Display'
import Border from '../StyleSelectors/Border'
import styles from './styles.module.css'









const StylePannel = () => {
    const dispatch = useDispatch()
  
    const onChange=(value) => {
        dispatch(applyStyle({
            key: cssToCamelCase('width'),
            value
        }))
    }
    
    return (
        <div className={styles.container}>
            <WidthAndHeight />      
            <MarginAndPadding/>
            <BoxShadow/> 
            <ColorPicker/>
            <Positions/>
            <Colors/>
            <BorderRadius/>
            <TextAlign/>
            <Display />
            <Border /> 
        </div>
    )
}

export default StylePannel 