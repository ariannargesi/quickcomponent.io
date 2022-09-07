export enum StyleFormats {
    CSS = "css",
    SASS = "sass",
}

export enum ScriptFormats {
    TS = "ts",
    JS = "js",
}

export enum ExportTypes {
    Named,
    Default,
}

export enum EditorView {
    Script,
    Style,
}

export enum typesDecleration {
    Interface,
    Type,
}

export interface TextObject {
    text: string
    key: string
}
export interface ComponentMemberProp {
    is?: string,
    className?: string
    style?: object,
}
export interface ComponentMember {
    name?: string,
    title?: string
    text?: string
    key: string
    props?: ComponentMemberProp
    children?: ComponentMember[]
}
export interface PropItem {
    name: string
    type: string
    required?: boolean
}

export interface Config {
    usingTestFile: boolean
    styleType: StyleFormats
    scriptType: ScriptFormats
    scriptFileName: string
    styleFileName: string
    exportType: ExportTypes
    propsList: PropItem[]
    hooksList: string[]
    componentName: string
    propDeclerationType: typesDecleration
    propDisctruction: boolean
}
export interface Output {
    output: {
        style: string
        script: string
        commands: { description: string; command: string }[]
    }
}

export interface RootState extends Output {
    openDrawer: boolean
    emptyTree: boolean
    treeHash: string
    selectedKey: string,
    assets: string[],
    config: Config
    inputKey: string
    map: ComponentMember[]
    editorView: EditorView
}

export interface HtmlElement {
    tag: string
    contentEditable: boolean
    textOnly
}

export interface SelectType {
    value: string
    label: string
}

const ts = ["string", "string[]", "number", "number[]", "boolean", "boolean[]"]

const js = [
    "PropTypes.string",
    "PropTypes.arrayOf(PropTypes.string)",
    "PropTypes.number",
    "PropTypes.arrayOf(PropTypes.number)",
    "PropTypes.bool",
    "PropTypes.arrayOf(PropTypes.bool)",
]

export const prop_types = {
    ts,
    js,
}
