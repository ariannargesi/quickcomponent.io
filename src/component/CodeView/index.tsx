import React, { useState } from 'react'
import { Button } from 'antd'
import { useSelector, RootStateOrAny } from 'react-redux'
import styles from './styles.module.sass'
import Editor from '../Editor'
import { useDispatch } from 'react-redux'
import { toggleEditorView, App } from '../../redux/slice'
import jszip from 'jszip'
import Filesaver from 'file-saver'
import HtmlTree from '../HtmlTree'
const zip = new jszip()

interface Props {
    script?: string,
    style?: string
}



const CodeView = (props: Props) => {

    const dispatch = useDispatch()

    //@ts-ignore
    const state = useSelector(state => state.app) as App
    const scriptFileName = state.config.scriptFileName + '.' + state.config.scriptType
    const styleFileName = state.config.styleFileName + '.' + state.config.styleType
    const { scriptType, styleType, componentName } = state.config





    const handleDownload = () => {
        zip.file(`index.${scriptType}`, '')
        zip.file(`style.${styleType}`, '')
        zip.file(`index.test.${scriptType}`, '')
        zip.generateAsync({ type: "blob" }).then(function (content) {
            Filesaver.saveAs(content, `${componentName}.zip`);
        });
    }

    const showScript = () => {
        dispatch(toggleEditorView({ value: 'script' }))
    }

    const showStyle = () => {
        dispatch(toggleEditorView({ value: 'style' }))
    }



    return (
        <div style={{
        }}>
            <div className={styles.container}>
                <div className={styles.switchers}>
                    <button className={state.editorView === 'script' && styles.active} onClick={showScript}>{scriptFileName}</button>
                    <button className={state.editorView === 'style' && styles.active} onClick={showStyle}>{styleFileName}</button>
                </div>
                <button
                    className={styles.downloadZip}
                    onClick={handleDownload} >Download zip</button>
            </div>
            <Editor />
        </div>
    )
}

export default CodeView
