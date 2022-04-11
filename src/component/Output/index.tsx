import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import jszip from "jszip"
import Filesaver from "file-saver"
import styles from "./styles.module.sass"
import Editor from "../Editor"
import { toggleEditorView } from "../../redux/slice/app"
import { RootState } from "../../types"
import { EditorView } from "../../types"
import { formatScript, formatStyle } from "../../helper"

const CodeView = () => {
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const scriptFileName =
        app.config.scriptFileName + "." + app.config.scriptType
    const styleFileName = app.config.styleFileName + "." + app.config.styleType
    const { scriptType, componentName, usingTestFile } = app.config

    const downloadFiles = () => {
        const zip = new jszip()
        zip.file(scriptFileName, formatScript(app.output.script))
        zip.file(
            styleFileName,
            formatStyle(app.output.style, app.config.styleType)
        )
        if (usingTestFile) zip.file(`index.test.${scriptType}`, "")
        zip.generateAsync({ type: "blob" }).then(function (content) {
            Filesaver.saveAs(content, `${componentName}.zip`)
        })
    }

    const showScript = () => {
        dispatch(toggleEditorView({ value: EditorView.Script }))
    }

    const showStyle = () => {
        dispatch(toggleEditorView({ value: EditorView.Style }))
    }

    return (
        <div style={{}}>
            <div className={styles.container}>
                <div className={styles.switchers}>
                    <button
                        className={
                            app.editorView === EditorView.Script
                                ? styles.active
                                : ""
                        }
                        onClick={showScript}
                    >
                        {scriptFileName}
                    </button>
                    <button
                        className={
                            app.editorView === EditorView.Style
                                ? styles.active
                                : ""
                        }
                        onClick={showStyle}
                    >
                        {styleFileName}
                    </button>
                </div>
                <button className={styles.downloadZip} onClick={downloadFiles}>
                    Download zip
                </button>
            </div>
            <Editor />
        </div>
    )
}

export default CodeView
