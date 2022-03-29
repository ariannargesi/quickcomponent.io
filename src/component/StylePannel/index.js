import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle } from '../../redux/slice'
import { cssToCamelCase } from '../../helper'
import WidthAndHeight from '../StyleSelectors/WidthAndHeight'
import MarginAndPadding from '../StyleSelectors/MarginAndPadding'
import BoxShadow from '../StyleSelectors/BoxShadow'
import Positions from '../StyleSelectors/Positions'
import Display from '../StyleSelectors/Display'
import BorderRadius from '../StyleSelectors/BorderRadius'
import TextAlign from '../StyleSelectors/TextAlign'
import Border from '../StyleSelectors/Border'
import FontSize from '../StyleSelectors/FontSize'
import Colors from '../StyleSelectors/Colors'
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

        </div>
    )
}

export default StylePannel 