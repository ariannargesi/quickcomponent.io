import { isEmptyObject } from "./"

import {
    ComponentMember,
    PropItem,
    StyleFormats,
    ScriptFormats,
    typesDecleration,
} from "../types"
import { CSSProperties } from "react"
import { current } from "@reduxjs/toolkit"

interface ScriptGeneratorConfig {
    componentName: string
    propsList: PropItem[]
    scriptType: ScriptFormats
    styleType: StyleFormats
    propsDistruction: boolean
    type: typesDecleration
    hooksList: string[]
    map: ComponentMember[]
}

const generateHooksList = (list: string[]): string => {
    // prettier automaticlly remove comma from last imported item
    return list.join(", ")
}

const generateTypeSscriptProps = (list: PropItem[]): string => {
    let value = "interface Prop {"
    list.forEach((item) => {
        value += `${item.name} ${item.required ? "" : "?"}: ${item.type};`
    })
    value += "}"
    return value
}

const generateJavascriptProps = (
    list: PropItem[],
): string => {

    const componentName = 'App'

    let value = ""
    value += `${componentName}.propTypes  = {`
    value += "\n"
    list.forEach((item) => {
        value += `${item.name}: propTypes.${item.type}${
            item.required ? ".isRequired" : ""
        },`
        value += "\n"
    })
    value += "}"
    return value
}

const extractItemsFromProps = (list: PropItem[]): string => {
    // prettier automaticlly remove comma from last imported item
    let value = "const {"
    list.forEach((item) => {
        value += item.name + ","
    })
    value += "} = props"
    return value
}

export const scriptGenerator = (config: ScriptGeneratorConfig): string => {
    const {
        componentName,
        propsList,
        scriptType,
        styleType,
        propsDistruction,
        hooksList,
        map,
    } = config

    let componentString = ""

    const newLine = (): void => {
        componentString += "\n"
    }

    const noHook = hooksList.length === 0
    const propsExsit = propsList.length > 0

    // Start: Import section
    if (noHook) componentString += `import React from 'react'`
    else
        componentString += `import React, {${generateHooksList(
            hooksList
        )}} from 'react'`

    newLine()

    if (scriptType === ScriptFormats.JS && propsExsit) {
        componentString += `import PropTypes from "prop-types"`
        newLine()
    }

    switch (styleType) {
        case StyleFormats.SASS:
            componentString += `import "./style.sass"`
            break
        case StyleFormats.CSS:
            componentString += `import "./style.css"`
    }

    newLine()

    // Typescript props
    if (scriptType === ScriptFormats.TS && propsExsit) {
        newLine()
        componentString += generateTypeSscriptProps(propsList)
        newLine()
    }

    newLine()

    // Main component
    componentString += `const ${componentName} = (props${
        scriptType === "ts" ? ":Props" : ""
    })${scriptType === "ts" ? ":React.ReactNode" : ""} => {`

    newLine()

    if (propsDistruction) componentString += extractItemsFromProps(propsList)

    newLine()

    componentString += `return (${arrayToJSX(map)})}`

    newLine()

    componentString += `export default ${componentName}`

    newLine()

    // Javascript props
    if (scriptType === ScriptFormats.JS && propsExsit) {
        newLine()
        componentString += generateJavascriptProps(propsList)
    }
    return componentString
}

const indentGenerator = (num: number): string => {
    let value = ""
    for (let c = 1; c <= num; c++) value += "\xa0"
    return value
}

const objectToStyle = (object: CSSProperties, semi: boolean, indent = undefined): string => {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object)
    const values = Object.values(object)
    let value = ""
    keys.forEach((key, index) => {
        let currentLine = ""
        if (indent != undefined) value += indentGenerator(indent)
        key.split("").forEach((char) => {
            if (char === char.toUpperCase())
                currentLine += "-" + char.toLowerCase()
            else currentLine += char
        })
        currentLine += ": "
        currentLine += values[index]
        if (semi) currentLine += ";"
        currentLine += "\n"
        value += currentLine
    })
    return value
}

export const styleGenerator = (
    map: ComponentMember[],
    styleType: StyleFormats
): string => {
    if (styleType === StyleFormats.SASS) return generateSASS(map)
    else if (styleType === StyleFormats.CSS) return generateCSS(map)
}

const generateCSS = (map: ComponentMember[]): string => {
    let value = ""
        map.forEach((el) => {
            if (el.props === undefined) return
            if (el.props.style && isEmptyObject(el.props.style)) {
                value +=
                    "." +
                    el.props.className +
                    "{\n" +
                    objectToStyle(el.props.style, true) +
                    "}"
            }
            if(el.children)
                value += generateCSS(el.children)
        })
    return value
}

const generateSASS = (map: ComponentMember[],  indent = 0): string => {
    let value = ""
    map.forEach((el) => {
        const indentStr = indentGenerator(indent)
        if (el.props === undefined) return
        if (el.props.style && isEmptyObject(el.props.style)) {
            value += `${indentStr}.${el.props.className}\n${objectToStyle(
                el.props.style,
                false,
                indent + 4
            )}`
        }
        if(el.children)
            value +=generateSASS(el.children, indent + 4)
    })
   
    return value
}


export const arrayToJSX = (map: ComponentMember[]) => {
    let value = ""
    map.forEach((el) => {
        if (!el.title && el.text){
            console.log(current(el))
            value += el.text
        }
            
        else {
            const className =
                el.props.className && el.props.style
                    ? `className='${el.props.className}'`
                    : ""
            value += `<${el.title} ${className}>${ el.text ? el.text : arrayToJSX(el.children)}</${
                el.title
            }>`
        }
    })
    return value
}
