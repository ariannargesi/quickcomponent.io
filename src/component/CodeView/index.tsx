import React from 'react'
import styles from './styles.module.sass'
import Editor from '../Editor'

interface Props {
    source: string[]
}

const CodeView = (props: Props) =>{

    const source = props.source 
    // const scriptCode = getSourceCode(source)

    return (
        <div>
            
            <button>Copy this file</button>
            <button>Download All</button>
            <div><button>CSS</button>
            <button>JS</button></div>
            <Editor/>
        </div>
    )
}

export default CodeView