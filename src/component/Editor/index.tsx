import React from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.css'
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.js'

import "prismjs/themes/prism.css"; //Example style, you can use another
import prettier from 'prettier/standalone'
import babylon from "prettier/parser-babel";
import { Config, State } from '../../redux/slice'
import { StyleFormats, ScriptFormats } from '../../helper/codeGenerators'
import './styles.css'
import { useSelector, RootStateOrAny } from "react-redux";



const Editor = () => {

  let style = {
    fileFormat: null,
    fileContent: null
  }
  //@ts-ignore
  const state = useSelector(state => state.html) as State
  const code = useSelector((state: RootStateOrAny) => {
    if(state.html.editorView === 'script')
      return state.html.output.script 
    else {
      return state.html.output.style  
    }
  })

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language, )
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");
    

  let lang

  
  if(state.editorView === 'script'){
    if(state.config.scriptType ===  ScriptFormats.TS )
     lang = 'TSX'
    else if(state.config.scriptType === ScriptFormats.JS)
     lang = 'JSX'
  }
  else if(state.editorView === 'style'){
    if(state.config.styleType === StyleFormats.SASS)
      lang = 'SASS'
    else if(state.config.styleType === StyleFormats.CSS)
      lang = 'CSS'
  }

  

  return (
    <CodeEditor
      value={code}
      onValueChange={() => {}}
      highlight={code => hightlightWithLineNumbers(code, state.editorView === 'script' ? languages.js : languages.css  )}
      textareaId="codeArea"
      className="editor"

      lang={lang}
      padding={10}
      style={{
        fontFamily: '"Source Sans Pro"',
        fontSize: 16,
        height: '85vh',
      }}
    />
  );
}

export default Editor 