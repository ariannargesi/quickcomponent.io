import React from 'react'
import { useSelector } from 'react-redux'
import WidthAndHeight from '../StyleSelectors/WidthAndHeight'
import BoxShadow from '../StyleSelectors/BoxShadow'
import Positions from '../StyleSelectors/Positions'
import Display from '../StyleSelectors/Display'
import BorderRadius from '../StyleSelectors/BorderRadius'
import TextAlign from '../StyleSelectors/TextAlign'
import Border from '../StyleSelectors/Border'
import FontSize from '../StyleSelectors/FontSize'
import FontWeight from '../StyleSelectors/FontWeight'
import Color from '../StyleSelectors/Color'
import BackgroundColor from '../StyleSelectors/BackgroundColor'
import Margin from '../StyleSelectors/Margin'
import Padding from '../StyleSelectors/Padding'
import { findNodeInTree } from '../../helper'
import { RootState } from '../../redux'
import { ComponentMember } from '../../redux/slice'
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
    // if selected element is a text node, do not show style selectors
    return (
        <div className={styles.container}>
            {element.text && (
                <h3 className={styles.message}>{`You can't apply style on text's. select another element`}</h3>
            )}
            {!element.text && (
                <>
                    <WidthAndHeight />
                    <Margin />
                    <Padding />
                    <BoxShadow />
                    <Positions />
                    <Display />
                    <BorderRadius />
                    <Border />
                    <TextAlign />
                    <FontSize />
                    <FontWeight />
                    <Color />
                    <BackgroundColor />
                </>
            )}
        </div>
    )
}

export default StylePannel 