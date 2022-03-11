import { Script } from "vm"
import {nanoid} from 'nanoid'
import arrayToJSX from '../helper/arrayToJSX'
export enum StyleFormats {
    CSS = "css",
    SASS = "sass" 
}

export enum ScriptFormats {
    TS = 'ts',
    JS = 'js' 
}

export enum ExportTypes {
    Named,
    Default
}

export interface PropsList {
    propName: string,
    propType: string, 
    propDefaultValue?: string 
}

export const getImportStyle = (format: StyleFormats, fileName = 'style'):string => {
    return `import './${fileName}.${format}'\n`   
}

export const getMainComponent = (exportType: ExportTypes, fileFormat: ScriptFormats, propsList: PropsList[], componentName = 'App'): string => {
    let propsString = getPropTypes(ScriptFormats.JS, propsList, 'App')
    let res  = ''
    if(exportType === ExportTypes.Default && propsList.length === 0)
        res += `export default (#PROPS) => {return (#JSX)}`
    else 
        res += ` #INTERFACE const ${componentName}=(#PROPS)=>{return (#JSX)}#PROP_TYPES export default ${componentName}`
    if(fileFormat === ScriptFormats.JS)
        res = res.replace('#PROP_TYPES', propsString)
    else if(fileFormat === ScriptFormats.TS)
        res = res.replace('#INTERFACE', propsString)
    return res 
}
export const placeJSXInComponentString = (componentString: string, JSX:string): string => {
    return componentString.replace('#JSX', JSX)
}

export const getPropTypes = (fileFormat: ScriptFormats, propsList: PropsList[], componentName?:string): string => {    let res = ''
    if(fileFormat === ScriptFormats.JS){
        res+= `${componentName}.propTypes {\n`
        propsList.forEach((item, index) => {
            res+= `${item.propName}:propTypes.${item.propType}`
            if(propsList.length-1 != index)
                res+= ','
        })
        res+='}'
    }
    else if(fileFormat === ScriptFormats.TS){
        res+= `interface Props {\n`
        propsList.forEach((item, index) => {
            res+= `${item.propName}:propTypes.${item.propType}`
            if(propsList.length-1 != index)
                res+= ','
        })
        res+='}'
    }
    return res 
}

export const importPropTypes = ():string =>{ 
    return "import PropTypes from 'prop-types'"
}   

export function getImport (x) {
	const hooks = ['useState', 'useEffect', 'useRef']
	if(x.indexOf(':') == -1)
		return "import React from 'react'\n"
	else {
		const hooksIndex = x.split(':')[1]
		const arr = JSON.parse(hooksIndex)
		let hooksString = ''
		arr.forEach((item, index) => {
			hooksString+= hooks[item]
			if(index != arr.length-1)
				hooksString+= ','
		})
		return `import React, {${hooksString}} from 'react'\n`	
	}
}

export default (config,map): string => {
    let str = ''

    str += getImport('')
    str += getImportStyle(StyleFormats.SASS, 'style')

    const mainComponent = getMainComponent(ExportTypes.Default, ScriptFormats.JS, [], 'App')
    const jsx = arrayToJSX(map)

    str+= placeJSXInComponentString(mainComponent, jsx).replace('#PROPS', '')

    return str 
}



const generateCss = (map): string =>{
    return ''
}

const generateSass = (map): string => {
    return ;
}

export const generateStyle = (config, map): string => {
    let res = ''
    if(config.StyleFormats === 'SASS')
        res = generateSass(map)
    else
         res = generateCss(map)
    return res 
}