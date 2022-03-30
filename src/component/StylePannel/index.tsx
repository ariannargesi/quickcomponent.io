import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle } from '../../redux/slice'
import { cssToCamelCase } from '../../helper'
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
import styles from './styles.module.css'
import { RootState } from '../../redux'


function getElement(key: string, html): any {
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

    const value = getElement(state.app.selectedKey, state.app.map)



    return (
        <div className={styles.container}>
            {value.text && (
                <h3 style={{marginTop: '200px', padding: '40px', textAlign: 'center'}}>{`You can't apply style on text's. select another element`}</h3>
            )}
            {!value.text && (
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