import React, { useState } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'
import styles from './styles.module.sass'
import Editor from '../Editor'
import { useDispatch } from 'react-redux'
import {toggleEditorView} from '../../redux/slice'
interface Props {
    script?: string,
    style?: string 
}

const CodeView = (props: Props) =>{

    const dispatch = useDispatch()

    const state = useSelector((state:RootStateOrAny) => state.html)
    const scriptFileName = state.config.scriptFileName+'.'+state.config.scriptType
    const styleFileName = state.config.styleFileName+'.'+state.config.styleType

    const changeView = () => {
        dispatch(toggleEditorView())
    }

    // file format 
    // file content 

    return (
        <div>
            <div>
                <button onClick={changeView}>{scriptFileName}</button>
                <button onClick={changeView}>{styleFileName}</button>
            </div>
            <Editor/>
        </div>
    )
}

export default CodeView