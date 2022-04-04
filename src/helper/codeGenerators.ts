import prettier from 'prettier/standalone'
import babel from "prettier/parser-babel"
import css from 'prettier/parser-postcss'
import arrayToJSx from '../helper/arrayToJSX'
import { ComponentMember, Prop } from "../redux/slice/app"
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

export enum EditorView {
    Script,
    Style
}


export const getImportStyle = (format: StyleFormats, fileName = 'style'):string => {
    return `import './${fileName}.${format}'\n`   
}

export const getMainComponent = (exportType: ExportTypes, fileFormat: ScriptFormats, propsList: Prop[], componentName = 'App'): string => {
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

export const getPropTypes = (fileFormat: ScriptFormats, propsList: Prop[], componentName?:string): string => {    let res = ''
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

// didn't find a better name 
export enum PropTypesDecleration {
    Interface,
    Type 
}

interface Config {
    componentName: string,
    propsList: Prop[],
    scriptType: ScriptFormats,
    styleType: StyleFormats,
    propsDistruction: boolean,
    propType: PropTypesDecleration,
    hooksList: string[],
    map: ComponentMember[]
}
export default (config: Config) => {
    const {
        componentName,
        propsList,
        scriptType,
        styleType,
        propsDistruction,
        propType,
        hooksList, 
        map
    } = config


    // My original component
    let component = ''

    if (hooksList.length === 0)
        component += `import React from 'react'`
    else {
        let temp = ''
        hooksList.forEach((item, index) => {
            temp += item
            if (hooksList.length - 1 != index)
                temp += ','
        })
        component += `import React, {${temp}} from 'react'`
    }


    component += '\n'


    if (styleType === 'sass')
        component += `import "./style.sass"`
    else if (styleType === 'css')
        component += `import "./style.css"`



    component += '\n'

    if(scriptType === 'ts' && propsList.length > 0 ){
        let temp = ''
            if(propType === PropTypesDecleration.Interface)
                temp+= 'interface'
            else if(propType === PropTypesDecleration.Type)
                temp+= 'type'
            temp+=' Props {'
            temp+='\n'
            propsList.map((item, index) => {
                temp+= `${item.propName}: ${item.propType}`
                if(propsList.length -1 != index)
                    temp+=','
                    temp+='\n'
            })
            temp+='}'
       component+=temp 
    }
    component+='\n'

    component+=`const ${componentName} = (props${scriptType === 'ts' ? ':Props' : ''})${scriptType === 'ts' ? ':JSX.element' : ''}`
    component+='=> {'
    component+='\n'

    if(propsDistruction){
        let temp = 'const {'
        propsList.forEach((item, index) => {
            temp+=item.propName
            if(propsList.length -1 != index)
                temp+=','
        })
        temp+='} = props'
        component+=temp 
    }

    component+='\n'
    component+='retrun ('
    component+='\n'
    component+=arrayToJSx(map)
    component+='\n'
    component+=')'
    component+='\n'

    component+='}'

    component += '\n'

    if(scriptType === 'js' && propsList.length > 0 ){
        let temp = ''
            temp+= `${componentName}.PropTypes = {`
            temp+='\n'
            propsList.map((item, index) => {
                temp+= `${item.propName}: PropTypes.${item.propType}`
                if(propsList.length -1 != index)
                    temp+=','
                    temp+='\n'
            })
            temp+='}'
       component+=temp 
    }
    component+='\n'

    return prettier.format( component, { parser: 'babel', plugins: [babel], semi: false })
}

const indentGenerator = (num) => {
    let str = ''
    for(let c = 1; c <= num; c++){
      str+='\xa0'
    }
    return str 
  }


function objectToStyle(object, semi, indent = undefined) {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object);
    const values = Object.values(object);
    let main = "";
    
    keys.map((key, index) => {
        let currentLine = "";
      if(indent != undefined)
      main+= indentGenerator(indent)
        key.split("").map((char) => {
            if (char === char.toUpperCase()) currentLine += "-" + char.toLowerCase();
            else currentLine += char;
        });
        currentLine += ": ";
        currentLine += values[index];
        if (semi) currentLine += ";";
        currentLine += "\n";
        main += currentLine;
    });
    return main;
}

export const styleGenerator = (map: ComponentMember[], styleType: StyleFormats): string => {
    if(styleType === StyleFormats.SASS)
        return generateSASS(map)
    else if(styleType === StyleFormats.CSS)
        return generateCSS(map)
}



const generateCSS = (map: ComponentMember[]): string => {
    let str = ''
    function giveMeCSS (html) {
        if(Array.isArray(html) === false) return 
        return html.map((el) => {
        if(el.props === undefined) return 
        if(el.props.style) {
            str+= '.' + el.props.className + '{\n' + objectToStyle(el.props.style, true) + '}\n'
        }
        giveMeCSS(el.children)
    })}
    giveMeCSS(map)
    return prettier.format(str, { parser: 'css', plugins: [css] })
}

function generateSASS (map: ComponentMember[]): string {
    let str = ''
  const arrayToComponent = (html, indent = 0) => {
      if(Array.isArray(html) === false) return 
      return html.forEach((el) => {
        let indentStr = indentGenerator(indent)
        if(el.props === undefined) return 
        if(el.props.style) {
          str+= `${indentStr}.${el.props.className}\n${objectToStyle(el.props.style, false, indent+4)}`
        }
      arrayToComponent(el.children, indent + 2)
     })
  };
  arrayToComponent(map)
  return str   
  }


