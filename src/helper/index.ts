import prettier from "prettier/standalone"
import babel from "prettier/parser-babel"
import css from "prettier/parser-postcss"
import { StyleFormats, ComponentMember, prop_types } from "../types"
import elementsList from "../data/html-elements"
import { nanoid } from "nanoid"
import { setInputAtKey } from "../redux/slice/app"

export const cssToCamelCase = (str: string): string => {
    /*
     * input: "border-radius"
     * output: borderRadius
     * */
    const chars = str.split("")

    str.split("").map((char, index) => {
        if (char === "-") chars[index + 1] = chars[index + 1].toUpperCase()
    })
    return chars.filter((char) => char != "-").join("")
}

export const findNodeInTree = (map: ComponentMember[], key: string): ComponentMember => {

    let result = null 

    for(let c = 0; c < map.length; c++){
        if(map[c].key === key){
            result = map[c]
            break 
        }
        else {
            if(map[c].children)
                result = findNodeInTree(map[c].children, key)
        }
    }
    return result 
}

export const getElementParent = (
    map: ComponentMember[],
    key: string,
    item = null
): ComponentMember => {

    let result = null 
    if(!map)
        return result 
  
    for(let c = 0; c < map.length; c++){
        if(map[c].key === key){
            result = item 
            
            break 
        }
        else {
            result = getElementParent(map[c].children, key, map[c])
        }
    }
    return result 
}

export const deleteNodeInTree = (map: ComponentMember[], key: string): void => {
    if (key === map[0].key) {
        map.splice(0, 1)
        return
    }

    const parent = getElementParent(map, key)
    let nodeIndex
    parent.children.find((item, index) => {
        if (item.key === key) {
            nodeIndex = index
            return true
        }
    })

    parent.children.splice(nodeIndex, 1)
}
//  CLEAN THIS
export const addNodeInPosition = (
    map: ComponentMember[],
    dropKey: string,
    dropPosition: number,
    node: ComponentMember,
    dropToGap: boolean
): void => {
    if (dropToGap) {
        const element = getElementParent(map, dropKey)
        element.children.splice(dropPosition, 0, node)
    } else {
        const element = findNodeInTree(map, dropKey)
        element.children.splice(dropPosition, 0, node)
    }
}

export const generateClassName = (name = "class_", length = 6): string => {
    return name + nanoid(length)
}

export const addStyleInNode = (
    map: ComponentMember[],
    key: string,
    propertyName: string,
    prpoertyValue: string
): void => {
    let element = findNodeInTree(map, key)
    if (isTextNode(element)) element = getElementParent(map, key)
    const style = element.props.style
    if (!element.props.className)
        element.props.className = generateClassName(element.title)
    element.props.style = {
        ...style,
        [propertyName]: prpoertyValue,
    }
}

export const addNodeInTree = (
    map: ComponentMember[],
    key: string,
    node: ComponentMember
): void => {
    const element = findNodeInTree(map, key)
    element.children.push(node)
}

export const updateClassName = (
    map: ComponentMember[],
    key: string,
    value: string
): void => {
    const element = findNodeInTree(map, key)
    element.props.className = value
}

export const removeStyleFromTree = (
    map: ComponentMember[],
    key: string,
    property: string
): void => {
    let element = findNodeInTree(map, key)
    if (isTextNode(element)) element = getElementParent(map, key)
    delete element.props.style[property]
}

export const getUnit = (str: string): string => {
    if (!str) return "px"
    let unit = ""
    str.split("").forEach((char) => {
        if (isNaN(Number(char))) unit += char
    })
    return unit
}

export const getNumbericValue = (str: string): number => {
    if (str === undefined) return 0
    let value = ""
    str.split("").forEach((char) => {
        if (!isNaN(Number(char))) value += char
    })
    return Number(value)
}

export const formatScript = (str: string): string => {
    return prettier.format(str, {
        parser: "babel",
        plugins: [babel],
        semi: false,
    })
}

export const formatStyle = (str: string, format: StyleFormats): string => {
    if (format === StyleFormats.SASS) return str
    else return prettier.format(str, { parser: "css", plugins: [css] })
}

const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", 'text']

export const isTextBasedTag = (tag: string): boolean => {
    return elements.indexOf(tag) >= 0
}

export const isEmptyObject = (value): boolean => {
    if (!value) return null
    return Object.keys(value).length > 0
}

export const isContentEditable = (value): boolean => {
    return elementsList.filter((item) => item.tag === value)[0].contentEditable
}

export const isHtmlTag = (value: string): boolean => {
    return elementsList.filter((item) => item.tag === value).length > 0
}

export const isTextNode = (value): boolean => {
    return value.title === 'text'
}



export const genereateElement = (
    name: string,
    dispatch: (any) => void
): ComponentMember => {
    // take html element name and return an object with ComponentMember
    name = name.toLowerCase()
    const elementKey = nanoid()
    const innerKey = nanoid()

    if (isTextBasedTag(name))
        dispatch(setInputAtKey({ key: elementKey }))
    if(name === 'button'){
        dispatch(setInputAtKey({key: innerKey}))
        return {
            title: "button",
            props: {
                className: "button_B-tI26",
                is: "text"
            },
            key: elementKey,
            children: [
                {
                    title: 'text',
                    text: "Button",
                    key: innerKey,
                },
            ],
        }
    }
    
    else if (isTextBasedTag(name))
        return {
            title: name,
            props: {
                className: generateClassName(name),
            },
            key: elementKey,
            text: "Text",
        }
    else {
        return {
            title: name,
            props: {
                className: generateClassName(name),
            },
            key: elementKey,
            children: [{ title: 'text', text: "Text", key: innerKey }],
        }
    }
}

export const convertProps = (propsList) => {
    const isJsProp = propsList[0].type.startsWith("PropTypes")
    const clone = JSON.parse(JSON.stringify(propsList))
    clone.forEach((item) => {
        let index = 0
        if (isJsProp) index = prop_types.js.indexOf(item.type)
        else index = prop_types.ts.indexOf(item.type)
        item.type = isJsProp ? prop_types.ts[index] : prop_types.js[index]
    })
    return clone
}
