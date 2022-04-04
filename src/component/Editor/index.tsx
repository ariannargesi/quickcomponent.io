import React, { useState, useEffect } from "react"
import AceEditor from "react-ace"
import { useSelector } from "react-redux"
import { Clipboard, Check } from 'react-feather'
import { App } from '../../redux/slice/app'
import { RootState } from '../../redux'
import { StyleFormats, ScriptFormats, EditorView } from '../../helper/codeGenerators'
import styles from './styles.module.sass'

import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = () => {

  const [showClipboard, setShowClipboard] = useState(true)
  const app = useSelector((state: RootState) => state.app) as App
  const code = useSelector((state: RootState) => {
    // get code depend on eidtor view
    if (state.app.editorView === EditorView.Script)
      return state.app.output.script
    else
      return state.app.output.style
  })

  let lang
  // Detect language of current visible code in the editor and use it
  if (app.editorView === EditorView.Script) {
    if (app.config.scriptType === ScriptFormats.TS)
      lang = 'tsx'
    else if (app.config.scriptType === ScriptFormats.JS)
      lang = 'jsx'
  }
  else if (app.editorView === EditorView.Style)
    if (app.config.styleType === StyleFormats.SASS)
      lang = 'sass'
    else if (app.config.styleType === StyleFormats.CSS)
      lang = 'css'

  // Show copy icon when user update config or change view
  useEffect(() => {
    setShowClipboard(true)
  }, [app])

  const handleCopy = () => {
    // copy code in clipboard 
    navigator.clipboard.writeText(code)
      .then(() => {
        setShowClipboard(false)
      })
  }

  return (
    <div className={styles.container}>
      <AceEditor
        mode={lang}
        theme="dracula"
        readOnly
        value={code}
        name="text-editor"
        fontSize={15}
        highlightActiveLine
      />
      {
        showClipboard ?
          <Clipboard onClick={handleCopy} color={'white'} />
          :
          <Check color='green' />
      }
    </div>
  );
}

export default Editor 
