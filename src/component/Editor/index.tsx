import { useSelector } from "react-redux"
import { RootState } from "../../types"
import { StyleFormats, EditorView } from "../../types"
import { formatScript, formatStyle } from "../../helper"
import { scrollBarStyle } from "../Styled"
import styled from 'styled-components'

const Container = styled.div`
    background: #282a36;
    color: #00d4f0;
    height: calc(100vh - 40px);
    padding: 0 16px;
    font-size: 16px;
    line-height: 30px;
    overflow: scroll;
    ${scrollBarStyle}
`

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
        <Container>
            <pre style={{margin: 0}}>
            {code}
            </pre>
        </Container>
    )
}

export default Editor
