import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { findNodeInTree, deleteNodeInTree, addNodeInPosition, addNodeInTree as addNode, addStyleInNode,removeStyleFromTree, updateNodeTitle } from '../../helper'
import generateScript, { ExportTypes, ScriptFormats, StyleFormats } from '../../helper/codeGenerators'
import React from 'react'
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { allowedNodeEnvironmentFlags } from 'process';
import scriptGenerator, {PropTypesDecleration, styleGenerator} from '../../helper/codeGenerators'
interface TextObject {
  text: string,
  key: string
}

export interface ComponentObject {
  title: string,
  text?: string
  key: string,
  props: object,
  children: ComponentObject[] | TextObject[]
}

export interface Prop {
  propName: string,
  propType: string, 
  propDefaultValue?: string,
  required?: boolean 
}

export interface Config {
usingTestFile: boolean,
    styleType: StyleFormats,
    scriptType: ScriptFormats,
    scriptFileName: string,
    styleFileName: string,
    exportType: ExportTypes,
    propsList: Prop[],
    hooksList: string[],
    componentName: string,
    propDeclerationType: PropTypesDecleration,
    propDisctruction: boolean 
}

interface Output {
  output: {
    style: string,
    script: string,
    commands: { description: string, command: string }[]
  }
}

export interface State extends Output {
  selectedKey: string,
  expandedKey: string []  
  searchQuery: {
    value: string,
    exact: boolean
  },
  config: Config,
  addChildTo: string,
  inputKey: string,
  map: ComponentObject[],
  editorView: string,
  refs: any[]
}

const initialState: State = {
  selectedKey: 'TpBr6w7RzTKfFA0Um2BW5',
  expandedKey: [],
  searchQuery: {
    value: '',
    exact: false
  },
  addChildTo: null,
  inputKey: null,
  refs: [], 
  map: [
    {
      title: "div",
      key: "TpBr6w7RzTKfFA0Um2BW5",
      props: {
        className: 'container',
        style: {
         
          background: 'white',
          padding: '25px',
          width: '100%',
          borderRadius: '38px',
          boxShadow: '0px 10px 15px -3px rgb(0 0 0 / 10%)'    
        }
      },
      children: [
        {
          title: "h1",
          key: nanoid(),
          props: {},
          children: [{ text: 'Hello world', key: nanoid() }],

        },
        {
          title: "h2",
          key: nanoid(),
          props: {},

          children: [{  title: "h2",
          key: nanoid(),
          props: {},

          children: [{ text: 'Mewwww!!!', key: 'cat' }]
        }]
        },
        {
          title: "h3",
          key: nanoid(),
          props: {},

          children: [{ text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h4",
          key: nanoid(),
          props: {},

          children: [{ text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h5",
          key: nanoid(),
          props: {},

          children: [{ text: 'Hello world', key: 'my-ff' }]
        },
      ]
    }
  ],
  config: {
    usingTestFile: true,
    scriptType: ScriptFormats.TS,
    scriptFileName: "index",
    hooksList: [],
    propDeclerationType: PropTypesDecleration.Interface,
    styleType: StyleFormats.CSS,
    styleFileName: 'style',
    exportType: ExportTypes.Default,
    propsList: [],
    componentName: 'App',
    propDisctruction: true 
  },
  output: {
    style: '',
    script: '',
    commands: []
  },
  editorView: 'script'
}

const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    moveElementInTree: (state, action) => {
      const { dragKey, dropKey, dropPosition, dropToGap } = action.payload
      findNodeInTree(state.map, dragKey, dargNode => {
        deleteNodeInTree(state.map, dragKey)
        addNodeInPosition(state.map, dropKey, dropPosition, dargNode, dropToGap)
      })
    },
    changeSelectedElement: (state, action) => {
      state.selectedKey = action.payload.key
    },
    deleteNode: (state, action) => {
      deleteNodeInTree(state.map, action.payload.key)
    },
    applyStyle: (state, action) => {
      const { key, value } = action.payload
      addStyleInNode(state.map, state.selectedKey, key, value)
    },
    generateCode: (state) => {
      state.output.style = styleGenerator(state.map, state.config.styleType)
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        propType: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType
      })
    },
    updateConfig: (state, action) => {
      state.config[action.payload.key] = action.payload.value
      state.output.style = styleGenerator(state.map, state.config.styleType)
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        propType: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType
      })

    },
    toggleEditorView: (state, action) => {
      state.editorView = action.payload.value
    },
    selectElementForAddingChild: (state, action) => {
      state.addChildTo = action.payload.key
    },
    addNodeInTree: (state, action) => {
        const elemetn = action.payload.element 
        const elementKey = elemetn.key 
        const elementChildren = elemetn.children 
        state.expandedKey.push(state.addChildTo, elementKey)
        addNode(state.map, state.addChildTo, action.payload.element)
     
    },
    showInputAtKey: (state, action) => {
      state.inputKey = action.payload.key
    },
    clearInputAtKey: (state) => {
      state.inputKey = null
    },
    updateTreeInputValue: (state, action) => {
      updateNodeTitle(state.map, state.inputKey, action.payload.value)
    },
    updateSearchQuery: (state, action) => {
      const { value, exact } = action.payload
      state.searchQuery.value = value 
    },
    addRef: (state, action) => {
      state.refs.push(action.payload.ref)
    },
    removeStyle: (state, action) => {
      const property = action.payload 
      removeStyleFromTree(state.map, state.selectedKey, property)
    },
    updateExpandedkeys: (state, action) => {
      console.log(action.payload)
      state.expandedKey =  action.payload
    }
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
  showInputAtKey,
  clearInputAtKey,
  updateTreeInputValue,
  updateSearchQuery,
  addRef, 
  generateCode,
  removeStyle,
  updateExpandedkeys

} = counterSlice.actions
export default counterSlice.reducer


