import React, { useState, useEffect } from "react";

import { Clipboard, Check } from 'react-feather'
import prettier from 'prettier/standalone'
import babel from "prettier/parser-babel"
import css from 'prettier/parser-postcss'
import { Config, App } from '../../redux/slice'
import { StyleFormats, ScriptFormats } from '../../helper/codeGenerators'
import './styles.css'
import { useSelector, RootStateOrAny } from "react-redux";
import styles from './styles.module.sass'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = () => {
  const [copy, setCopy] = useState(false)

  let style = {
    fileFormat: null,
    fileContent: null
  }
  //@ts-ignore
  const state = useSelector(state => state.app) as App
  const code = useSelector((state: RootStateOrAny) => {
    if (state.app.editorView === 'script')
      return state.app.output.script
    else {
      return state.app.output.style
    }
  })



  let lang


  if (state.editorView === 'script') {
    if (state.config.scriptType === ScriptFormats.TS)
      lang = 'tsx'
    else if (state.config.scriptType === ScriptFormats.JS)
      lang = 'jsx'
  }
  else if (state.editorView === 'style') {
    if (state.config.styleType === StyleFormats.SASS)
      lang = 'sass'
    else if (state.config.styleType === StyleFormats.CSS)
      lang = 'css'
  }


  let finalValue


  if (state.editorView === 'style') {
    if (state.config.styleType === StyleFormats.SASS)
      finalValue = code
    else {
      finalValue = prettier.format(code, { parser: 'css', plugins: [css] })
    }
  }
  else if (state.editorView === 'script') {
    finalValue = prettier.format(code, { parser: 'babel', plugins: [babel] })
  }



  useEffect(() => {
    setCopy(false)
  }, [state])


  const handleCopy = () => {
    navigator.clipboard.writeText(finalValue).then(function() {
      setCopy(true)
    }, function() {
      alert('failed')
    });
  }


  return (
    <div className={styles.container}>
      <AceEditor
        mode={lang}
        theme="dracula"
        value={finalValue}
        name="text-editor"
        fontSize={15}
        highlightActiveLine
        style={{
          lineHeight: '25px',
         
          
        }}
        editorProps={{}}
      />
      {copy ?
       <Check className={styles.copyButton} color='green'/>
       :
      <Clipboard className={styles.copyButton} onClick={handleCopy} color={'white'} />
      }
    </div>
  );
}

export default Editor 
