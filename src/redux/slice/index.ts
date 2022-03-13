import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { findNodeInTree, deleteNodeInTree, addNodeInPosition, addNodeInTree as addNode, addStyleInNode, updateNodeTitle } from '../../helper'
import generateScript, { ExportTypes, ScriptFormats, StyleFormats, generateStyle } from '../../helper/codeGenerators'
import React from 'react'
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

interface TextObject {
  text: string,
  key: string
}

interface ComponentObject {
  title: string,
  text?: string
  key: string,
  props: object,
  children: ComponentObject[] | TextObject[]
}

interface Config {
  config: {
    usingTextFile: boolean,
    scriptType: ScriptFormats,
    styleType: StyleFormats,
    scriptFileName: string,
    styleFileName: string,
    exportType: ExportTypes,
    propsList: any[],
    componentName: string
  }

}

interface Output {
  output: {
    style: string,
    script: string,
    commands: { description: string, command: string }[]
  }
}

interface State extends Config, Output {
  selectedKey: string,
  searchQuery: {
    value: string,
    exact: boolean
  },
  addChildTo: string,
  inputKey: string,
  map: ComponentObject[],
  editorView: string 
}

const initialState: State = {
  selectedKey: 'TpBr6w7RzTKfFA0Um2BW5',
  searchQuery: {
    value: '',
    exact: false
  },
  addChildTo: null,
  inputKey: null,
  map: [
    {
      title: "div",
      key: "TpBr6w7RzTKfFA0Um2BW5",
      props: {},
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

          children: [{ text: 'Hello world', key: nanoid() }]
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

          children: [{ text: 'Hello world', key: nanoid() }]
        },
      ]
    }
  ],
  config: {
    usingTextFile: true,
    scriptType: ScriptFormats.TS,
    scriptFileName: "index",
    styleType: StyleFormats.SASS,
    styleFileName: 'style',
    exportType: ExportTypes.Default,
    propsList: [],
    componentName: 'App',
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
    updateConfig: (state, action) => {
      state.config[action.payload.key] = action.payload.value
      // this function only return the code for you to can see it 
      state.output.script = generateScript(state.config, state.map)
      state.output.style = generateStyle(state.config, state.map)
    },
    toggleEditorView: (state) => {
      state.editorView = state.editorView === 'script' ? 'style' : 'script'
    },
    selectElementForAddingChild: (state, action) => {
      state.addChildTo = action.payload.key
    },
    addNodeInTree: (state, action) => {
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
  updateSearchQuery

} = counterSlice.actions
export default counterSlice.reducer


const ojb = {
  name: 'adfd',
  fun: () => {
    console.log(ojb.name)
  }
}