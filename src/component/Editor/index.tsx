import { useState, useEffect } from "react"
import AceEditor from "react-ace"
import { useSelector } from "react-redux"
import { Clipboard, Check } from "react-feather"
import { App } from "../../types"
import { RootState } from "../../types"
import { StyleFormats, EditorView } from "../../types"
import { formatScript, formatStyle } from "../../helper"
import styles from "./styles.module.sass"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-sass"
import "ace-builds/src-noconflict/theme-dracula"

const Editor = () => {
    const [showClipboard, setShowClipboard] = useState(true)
    const app = useSelector((state: RootState) => state.app) as App
    const code = useSelector((state: RootState) => {
        // get code depend on eidtor view
        if (state.app.editorView === EditorView.Script)
            return formatScript(state.app.output.script)
        else return formatStyle(state.app.output.style)
    })

    let mode
    if (app.editorView === EditorView.Script) {
        mode = "javascript"
    } else if (app.editorView === EditorView.Style)
        if (app.config.styleType === StyleFormats.SASS) mode = "sass"
        else if (app.config.styleType === StyleFormats.CSS) mode = "css"

    // Show copy icon when user update config or change view
    useEffect(() => {
        setShowClipboard(true)
    }, [app])

    const handleCopy = () => {
        // copy code in clipboard
        navigator.clipboard.writeText(code).then(() => {
            setShowClipboard(false)
        })
    }

    return (
        <div className={styles.container}>
            <AceEditor
                mode={mode}
                theme="dracula"
                readOnly
                value={code}
                name="text-editor"
                fontSize={15}
                highlightActiveLine
            />
            {showClipboard ? (
                <Clipboard onClick={handleCopy} color={"white"} />
            ) : (
                <Check color="green" />
            )}
        </div>
    )
}

export default Editor
