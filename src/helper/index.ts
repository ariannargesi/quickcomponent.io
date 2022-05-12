import prettier from "prettier/standalone"
import babel from "prettier/parser-babel"
import css from "prettier/parser-postcss"
import { StyleFormats, ComponentMember} from "../types"
import elementsList from '../data/html-elements'
import {nanoid} from 'nanoid'
import { setInputAtKey } from "../redux/slice/app"

export const cssToCamelCase = (str: string): string => {
    /*
     * input: "border-radius"
     * output: borderRadius
     * */
    const chars = str.split("")

    str.split("").map((char, index) => {
        if (char === "-") 
            chars[index + 1] = chars[index + 1].toUpperCase()        
    })
    return chars.filter( char => char != '-').join('')
}


export const findNodeInTree = (map: ComponentMember[], key: string): ComponentMember => {
    let result;
    if(!Array.isArray(map))
        return map 
    map.some(o => result = o.key === key && o || findNodeInTree(o.children, key))
    return result || undefined;
  }

//   CLEAN 
export const deleteNodeInTree = (map: ComponentMember[], key: string): void => {

    if(key === map[0].key){
        map.splice(0, 1)
        return 
    }

    const parent = getElementParent(map, key)    
    let nodeIndex 
    parent.children.find((item, index) => {
        if(item.key === key){
            nodeIndex = index 
            return true 
        }
    })

    parent.children.splice(nodeIndex, 1)
}
//  CLEAN THIS 
export const addNodeInPosition = (map: ComponentMember[], dropKey: string, dropPosition: number, node: ComponentMember, dropToGap: boolean 
): void => {

    if(dropToGap) { 
        const element = getElementParent(map, dropKey)
        element.children.splice(dropPosition, 0, node)
    } else {
        const element = findNodeInTree(map, dropKey)
        element.children.splice(dropPosition, 0, node)
    }
}

export const generateClassName = (name = 'class_', length = 6): string => {
    return name + nanoid(length)
}

export const addStyleInNode = (map: ComponentMember[], key: string, propertyName: string, prpoertyValue: string ): void => {
    const element = findNodeInTree(map, key)
    const style = element.props.style 
    if(!element.props.className)
        element.props.className = generateClassName(element.title)
    element.props.style = {
        ...style,
        [propertyName]: prpoertyValue
    }
}

export const addNodeInTree = (map: ComponentMember[], key: string, node: ComponentMember): void => {
    const element = findNodeInTree(map, key) 
    element.children.push(node)
}

export const updateNodeTitle = (map: ComponentMember[], key: string, value: string): void => {
    const element = findNodeInTree(map, key)
    element.text = value
}

export const updateClassName = (map: ComponentMember[], key: string, value: string): void => {
    const element = findNodeInTree(map, key)
    element.props.className = value 
}

export const removeStyleFromTree = (map: ComponentMember[], key: string, property: string): void => {
    const element = findNodeInTree(map, key)
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


const elements = ['h1','h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label']

export const isTextBasedTag = (tag: string): boolean => {
    return elements.indexOf(tag) >= 0
}

export const isEmptyObject = (value): boolean => {
    if(!value) return null 
    return Object.keys(value).length > 0
}

export const isContentEditable = (value): boolean => {
    return elementsList.filter(item => item.tag === value)[0].contentEditable
} 

export const isHtmlTag = (value: string): boolean => {
    return elementsList.filter(item => item.tag === value).length > 0
} 

export const isTextNode = (value: any): boolean => {
    if(Object.keys(value).length > 2) return false 
    if(value['text'] && value['key'])
        return true 
}

export const getElementParent = (map: ComponentMember[], key: string, item = null): ComponentMember => {
    let result;
    if(!Array.isArray(map)) return map 
    map.some(o => result = o.key === key && item || getElementParent(o.children, key, o));
    return result || undefined;
}

export const genereateElement =(name: string, dispatch: any): ComponentMember => {
    // take html element name and return an object with ComponentMember    
    name = name.toLowerCase()
    const elementKey = nanoid()
    const innerKey = nanoid()
    
    if(isTextBasedTag(name) || name === 'button')
        dispatch(setInputAtKey({ key: elementKey }))
    if(name === 'text'){
        return {
            text: 'text',
            key: elementKey
        }
    }
    if(isTextBasedTag(name))
        return {
            title: name,
            props: {
                className: generateClassName(name)
            },
            key: elementKey,
            text: 'Text', 
        }
    else {
        return {
            title: name,
            props: {
                className: generateClassName(name)
                
            },
            key: elementKey,
            children: [{text: 'ff', key: innerKey}], 
        }
    }
}