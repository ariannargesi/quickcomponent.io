import prettier from "prettier/standalone"
import babel from "prettier/parser-babel"
import css from "prettier/parser-postcss"
import { StyleFormats } from "../types"

export function cssToCamelCase(string) {
    /*
     * input: "border-radius"
     * output: borderRadius
     * */
    const charsArray = string.split("")

    string.split("").map((character, index) => {
        if (character === "-" && index != 0) {
            charsArray[index + 1] = charsArray[index + 1].toUpperCase()
        }
    })

    const resultString = charsArray
        .filter((character) => character != "-")
        .join("")
    return resultString
}
export function objectToStyle(object, semi) {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object)
    const values = Object.values(object)
    let main = ""
    keys.map((key, index) => {
        let currentLine = ""
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

export const findNodeInTree = (tree, key, callback) => {
    tree.forEach((item) => {
        if (item.key === key) callback(item)
        else if (item.children) findNodeInTree(item.children, key, callback)
    })
}

export function deleteNodeInTree(tree, key) {
    tree.forEach((item, index) => {
        if (item.key === key) tree.splice(index, 1)
        else if (item.children) deleteNodeInTree(item.children, key)
    })
}

export function addNodeInPosition(
    tree,
    dropKey,
    dropPosition,
    node,
    dropToGap
) {
    tree.forEach((item) => {
        if (item.key === dropKey) {
            if (dropToGap) {
                tree.splice(dropPosition, 0, node)
            } else item.children.splice(dropPosition, 0, node)
        } else if (item.children)
            addNodeInPosition(
                item.children,
                dropKey,
                dropPosition,
                node,
                dropToGap
            )
    })
}

export function addStyleInNode(tree, key, propertyName, prpoertyValue) {
    tree.forEach((item) => {
        if (item.key === key) {
            const style = item.props.style
            item.props = {
                ...item.props,
                style: {
                    ...style,
                    [propertyName]: prpoertyValue,
                },
            }
        } else if (item.children)
            addStyleInNode(item.children, key, propertyName, prpoertyValue)
    })
}

export function addNodeInTree(tree, key, node) {
    tree.forEach((item) => {
        if (item.key === key) item.children.push(node)
        else if (item.children) addNodeInTree(item.children, key, node)
    })
}

export function updateNodeTitle(tree, key, value) {
    tree.forEach((item) => {
        if (item.key === key) item.text = value
        else if (item.children) updateNodeTitle(item.children, key, value)
    })
}

export function removeStyleFromTree(tree, key, property) {
    tree.forEach((item) => {
        if (item.key === key) delete item.props.style[property]
        else if (item.children)
            removeStyleFromTree(item.children, key, property)
    })
}

export function getUnit(str: string): string {
    if (str === undefined) return "px"
    let unit = ""
    str.split("").forEach((char) => {
        if (isNaN(Number(char))) unit += char
    })
    return unit
}

export function getNumbericValue(str: string): number {
    if (str === undefined) return 0
    let value = ""
    str.split("").forEach((char) => {
        if (!isNaN(Number(char))) value += char
    })
    return Number(value)
}

export function formatScript(str: string): string {
    return prettier.format(str, {
        parser: "babel",
        plugins: [babel],
        semi: false,
    })
}

export function formatStyle(str: string, format: StyleFormats): string {
    if (format === StyleFormats.SASS) return str
    else return prettier.format(str, { parser: "css", plugins: [css] })
}
