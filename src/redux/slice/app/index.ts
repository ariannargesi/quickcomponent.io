import { createSlice } from "@reduxjs/toolkit"
import {
    findNodeInTree,
    deleteNodeInTree,
    addNodeInPosition,
    addNodeInTree as addNode,
    addStyleInNode,
    removeStyleFromTree,
    updateNodeTitle,
    updateClassName as changeClassname,
    isTextNode,
    getElementParent,
    convertProps,
} from "../../../helper"

import {
    ExportTypes,
    ScriptFormats,
    StyleFormats,
    EditorView,
} from "../../../types"
import { styleGenerator, scriptGenerator } from "../../../helper/codeGenerators"
import { typesDecleration, RootState } from "../../../types"
import initialMap from "../../../welcome-map"

const initialState: RootState = {
    openDrawer: false,
    selectedKey: initialMap[0].key,
    expandedKey: [],
    addChildTo: null,
    treeHash: null,
    emptyTree: false,
    inputKey: null,
    map: initialMap,
    config: {
        usingTestFile: true,
        scriptType: ScriptFormats.TS,
        scriptFileName: "index",
        hooksList: [],
        propDeclerationType: typesDecleration.Interface,
        styleType: StyleFormats.CSS,
        styleFileName: "style",
        exportType: ExportTypes.Default,
        propsList: [],
        componentName: "App",
        propDisctruction: true,
    },
    output: {
        style: "",
        script: "",
        commands: [],
    },
    editorView: EditorView.Script,
}

const counterSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        moveElementInTree: (state, action) => {
            const { dragKey, dropKey, dropPosition, dropToGap } = action.payload
            state.treeHash = dragKey
            const dragNode = findNodeInTree(state.map, dragKey)
            deleteNodeInTree(state.map, dragKey)
            addNodeInPosition(
                state.map,
                dropKey,
                dropPosition,
                dragNode,
                dropToGap
            )
        },
        changeSelectedElement: (state, action) => {
            state.selectedKey = action.payload.key
        },
        deleteNode: (state, action) => {
            const key = action.payload.key
            state.treeHash = key
            // select root
            if (key === state.selectedKey) state.selectedKey = state.map[0].key

            deleteNodeInTree(state.map, key)

            const element = findNodeInTree(state.map, state.selectedKey)

            if(element === null)
                state.selectedKey = state.map[0].key 

            if (state.map.length === 0) state.emptyTree = true
        },
        applyStyle: (state, action) => {
            const { key, value } = action.payload
            addStyleInNode(state.map, state.selectedKey, key, value)
        },
        generateCode: (state) => {
            state.output.style = styleGenerator(
                state.map,
                state.config.styleType
            )
            state.output.script = scriptGenerator({
                componentName: state.config.componentName,
                hooksList: state.config.hooksList,
                map: state.map,
                type: state.config.propDeclerationType,
                propsDistruction: state.config.propDisctruction,
                propsList: state.config.propsList,
                scriptType: state.config.scriptType,
                styleType: state.config.styleType,
            })
        },
        updateConfig: (state, action) => {
            const key = action.payload.key
            const value = action.payload.value
            if (
                key === "scriptType" &&
                state.config.scriptType != value &&
                state.config.propsList.length > 0
            ) {
                state.config.propsList = convertProps(state.config.propsList)
            }
            state.config[action.payload.key] = action.payload.value
            state.output.style = styleGenerator(
                state.map,
                state.config.styleType
            )
            state.output.script = scriptGenerator({
                componentName: state.config.componentName,
                hooksList: state.config.hooksList,
                map: state.map,
                type: state.config.propDeclerationType,
                propsDistruction: state.config.propDisctruction,
                propsList: state.config.propsList,
                scriptType: state.config.scriptType,
                styleType: state.config.styleType,
            })
        },
        toggleEditorView: (state, action) => {
            state.editorView = action.payload.value
        },
        selectElementForAddingChild: (state, action) => {
            state.addChildTo = action.payload.key
        },
        addNodeInTree: (state, action) => {
            const element = action.payload.element
            state.treeHash = element.key

            if (state.map.length === 0) {
                state.map.push(element)
                state.emptyTree = false
            } else {
                state.expandedKey.push(state.addChildTo, element.key)
                addNode(state.map, state.addChildTo, element)
            }

            if (isTextNode(element)) {
                const el = getElementParent(state.map, element.key)
                state.selectedKey = el.key
            } else state.selectedKey = element.key
        },
        setInputAtKey: (state, action) => {
            state.inputKey = action.payload.key
        },
        clearInputAtKey: (state) => {
            state.inputKey = null
        },
        updateTreeInputValue: (state, action) => {
            updateNodeTitle(state.map, state.selectedKey, action.payload.value)
            // state.inputKey = null
        },
        removeStyle: (state, action) => {
            const property = action.payload
            removeStyleFromTree(state.map, state.selectedKey, property)
        },
        updateExpandedkeys: (state, action) => {
            state.expandedKey = action.payload
        },
        toggleDrawer: (state) => {
            state.openDrawer = !state.openDrawer
        },
        updateClassName: (state, action) => {
            const { value } = action.payload
            changeClassname(state.map, state.selectedKey, value)
        },
    },
})

export const {
    moveElementInTree,
    changeSelectedElement,
    applyStyle,
    updateConfig,
    toggleEditorView,
    deleteNode,
    addNodeInTree,
    selectElementForAddingChild,
    setInputAtKey,
    clearInputAtKey,
    updateTreeInputValue,
    generateCode,
    removeStyle,
    updateExpandedkeys,
    toggleDrawer,
    updateClassName,
} = counterSlice.actions
export default counterSlice.reducer
