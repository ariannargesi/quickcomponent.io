import React from 'react'
import styles from './styles.module.sass'
import Editor from '../Editor'

interface Props {
    code: string 
}

const CodeView = (props: Props) =>{

  

    return (
        <div>
            <h1></h1>
            <button>Copy this file</button>
            <button>Download All</button>
            <div><button>CSS</button>
            <button>JS</button></div>
            <Editor code={props.code}/>
        </div>
    )
}

export default CodeView