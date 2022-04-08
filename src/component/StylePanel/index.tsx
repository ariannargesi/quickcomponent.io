import React from 'react'
import { useSelector } from 'react-redux'
import WidthAndHeight from '../Selectors/WidthAndHeight'
import BoxShadow from '../Selectors/BoxShadow'
import Positions from '../Selectors/Positions'
import Display from '../Selectors/Display'
import BorderRadius from '../Selectors/BorderRadius'
import TextAlign from '../Selectors/TextAlign'
import Border from '../Selectors/Border'
import FontSize from '../Selectors/FontSize'
import FontWeight from '../Selectors/FontWeight'
import Color from '../Selectors/Color'
import BackgroundColor from '../Selectors/BackgroundColor'
import Margin from '../Selectors/Margin'
import Padding from '../Selectors/Padding'
import { findNodeInTree } from '../../helper'
import { RootState, ComponentMember } from '../../types'

import styles from './styles.module.sass'


function getElement(key: string, html:ComponentMember[]): ComponentMember {
    let res
    findNodeInTree(html, key, (value) => {
        res = value
    })

    if (res)
        return res
    else
        return null
}

const StylePannel = () => {
 
    const state = useSelector((state: RootState) => state)
    const element = getElement(state.app.selectedKey, state.app.map)

    let message 
    if(!element)
        message = 'Please select an element.'
        
    return (
        <div className={styles.container}>
            {message && <h3 className={styles.message}>{message}</h3>}
            { element && !element.text && (
                <>
                    <WidthAndHeight />
                    <Margin />
                    <Padding />
                    <Color />
                    <BackgroundColor />
                    <BoxShadow />
                    <Positions />
                    <Display />
                    <BorderRadius />
                    <Border />
                    <TextAlign />
                    <FontSize />
                    <FontWeight />

                </>
            )}
        </div>
    )
}

export default StylePannel 