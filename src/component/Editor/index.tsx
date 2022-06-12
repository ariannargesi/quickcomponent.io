import AceEditor from "react-ace"
import { useSelector } from "react-redux"
import { RootState } from "../../types"
import { StyleFormats, EditorView } from "../../types"
import { formatScript, formatStyle } from "../../helper"
import styles from "./styles.module.sass"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-sass"
import "ace-builds/src-noconflict/theme-dracula"

const Editor = () => {
    const editorView = useSelector((state: RootState) => state.editorView)

    const config = useSelector((state: RootState) => state.config)

    const code = useSelector((state: RootState) => {
        if (state.editorView === EditorView.Script)
            return formatScript(state.output.script)
        else return formatStyle(state.output.style, config.styleType)
    })

    let mode

    if (editorView === EditorView.Script) {
        mode = "javascript"
    } else if (editorView === EditorView.Style)
        if (config.styleType === StyleFormats.SASS) mode = "sass"
        else if (config.styleType === StyleFormats.CSS) mode = "css"

    // Show copy icon when user update config or change view

    return (
        <div className={styles.container}>
            <AceEditor
                readOnly
                setOptions={{ useWorker: false }}
                mode={mode}
                theme="dracula"
                value={code}
                name="text-editor"
                fontSize={15}
                highlightActiveLine
            />
        </div>
    )
}

export default Editor
