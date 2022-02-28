import React from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import './styles.css'
const Editor = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");



  return (
    <CodeEditor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={code => hightlightWithLineNumbers(code, languages.js)}
      textareaId="codeArea"
      className="editor"
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
      }}
    />
  );
}

export default Editor 