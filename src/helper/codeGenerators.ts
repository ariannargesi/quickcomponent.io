import arrayToJSx from "../helper/arrayToJSX"
import {
    ComponentMember,
    PropItem,
    StyleFormats,
    ScriptFormats,
    typesDecleration,
} from "../types"
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
export const scriptGenerator = (config: ScriptGeneratorConfig) => {
    const {
        componentName,
        propsList,
        scriptType,
        styleType,
        propsDistruction,
        hooksList,
        map,
    } = config
    let component = ""
    if (hooksList.length === 0) component += `import React from 'react'`
    else {
        let temp = ""
        hooksList.forEach((item, index) => {
            temp += item
            if (hooksList.length - 1 != index) temp += ","
        })
        component += `import React, {${temp}} from 'react'`
    }

    component += "\n"
    if (scriptType === "js" && propsList.length > 0) {
        component += `import PropTypes from "prop-types"`
        component += "\n"
    }

    if (styleType === "sass") component += `import "./style.sass"`
    else if (styleType === "css") component += `import "./style.css"`

    component += "\n"

    if (scriptType === "ts" && propsList.length > 0) {
        let temp = ""
        temp += "interface"
        temp += " Props {"
        temp += "\n"
        propsList.map((item, index) => {
            temp += `${item.name} ${item.required ? "" : "?"}: ${item.type}`
            if (propsList.length - 1 != index) temp += ","
            temp += "\n"
        })
        temp += "}"
        component += temp
    }
    component += "\n"

    component += `const ${componentName} = (props${
        scriptType === "ts" ? ":Props" : ""
    })${scriptType === "ts" ? ":React.ReactNode" : ""}`
    component += "=> {"
    component += "\n"

    if (propsDistruction) {
        let temp = "const {"
        propsList.forEach((item, index) => {
            temp += item.name
            if (propsList.length - 1 != index) temp += ","
        })
        temp += "} = props"
        component += temp
    }

    component += "\n"
    component += "retrun ("
    component += "\n"
    component += arrayToJSx(map)
    component += "\n"
    component += ")"
    component += "\n"
    component += "}"
    component += "\n"

    component += `export default ${componentName}`

    if (scriptType === "js" && propsList.length > 0) {
        component += "\n"
        let temp = ""
        temp += `${componentName}.propTypes  = {`
        temp += "\n"
        propsList.map((item, index) => {
            temp += `${item.name}: propTypes.${item.type}${
                item.required ? ".isRequired" : ""
            }`
            if (propsList.length - 1 != index) temp += ","
            temp += "\n"
        })
        temp += "}"
        component += temp
    }
    return component
}

const indentGenerator = (num) => {
    let str = ""
    for (let c = 1; c <= num; c++) {
        str += "\xa0"
    }
    return str
}

function objectToStyle(object, semi, indent = undefined) {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object)
    const values = Object.values(object)
    let main = ""

    keys.map((key, index) => {
        let currentLine = ""
        if (indent != undefined) main += indentGenerator(indent)
        key.split("").map((char) => {
            if (char === char.toUpperCase())
                currentLine += "-" + char.toLowerCase()
            else currentLine += char
        })
        currentLine += ": "
        currentLine += values[index]
        if (semi) currentLine += ";"
        currentLine += "\n"
        main += currentLine
    })
    return main
}

export const styleGenerator = (
    map: ComponentMember[],
    styleType: StyleFormats
): string => {
    if (styleType === StyleFormats.SASS) return generateSASS(map)
    else if (styleType === StyleFormats.CSS) return generateCSS(map)
}

const generateCSS = (map: ComponentMember[]): string => {
    let str = ""
    function giveMeCSS(html) {
        if (Array.isArray(html) === false) return
        return html.map((el) => {
            if (el.props === undefined) return
            if (el.props.style) {
                str +=
                    "." +
                    el.props.className +
                    "{\n" +
                    objectToStyle(el.props.style, true) +
                    "}\n"
            }
            giveMeCSS(el.children)
        })
    }
    giveMeCSS(map)
    return str
}

function generateSASS(map: ComponentMember[]): string {
    let str = ""
    const arrayToComponent = (html, indent = 0) => {
        if (Array.isArray(html) === false) return
        return html.forEach((el) => {
            const indentStr = indentGenerator(indent)
            if (el.props === undefined) return
            if (el.props.style) {
                str += `${indentStr}.${el.props.className}\n${objectToStyle(
                    el.props.style,
                    false,
                    indent + 4
                )}`
            }
            arrayToComponent(el.children, indent + 2)
        })
    }
    arrayToComponent(map)
    return str
}
