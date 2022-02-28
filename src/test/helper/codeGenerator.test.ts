import { ExportTypes,ScriptFormats, StyleFormats, getImportStyle, getMainComponent, getPropTypes } from '../../helper/codeGenerators'

const componentName = 'Header'
const propsList = [
    {propName: 'title', propType: 'string'},
    {propName: 'header', propType: 'node'}
    
]
test('Should return the right string', () => {
//    expect(getImportStyle(StyleFormats.CSS)).toBe("import ./style.css")
//    expect(getImportStyle(StyleFormats.SASS)).toBe("import ./style.sass")
//    expect(getImportStyle(StyleFormats.SASS, 'index')).toBe("import ./index.sass")

    // expect(getMainComponent(ExportTypes.Named, ScriptFormats.JS, [], 'Header')).toBe(`const Header=(#PROPS)=>{return (#JSX)}export default Header`)
    // expect(getMainComponent(ExportTypes.Default, ScriptFormats.JS, [])).toBe('export default (#PROPS) => {return (#JSX)}')

    expect(getPropTypes(ScriptFormats.TS, propsList, 'App')).toBe('interface Props {\ntitle:propTypes.string,header:propTypes.node}\n')
})

