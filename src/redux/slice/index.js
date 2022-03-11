import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { findNodeInTree, deleteNodeInTree, addNodeInPosition, addNodeInTree as addNode, addStyleInNode, updateNodeTitle } from '../../helper'
import generateScript, { ExportTypes, ScriptFormats, StyleFormats, generateStyle } from '../../helper/codeGenerators'
import React from 'react'
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

function log(x) {
  console.log(current(x))
}

const initialState = {
  selectedKey: 'TpBr6w7RzTKfFA0Um2BW5',
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
    testFile: true,
    scriptFormat: ScriptFormats.TS,
    scriptFileName: "index",
    styleFormat: StyleFormats.SASS,
    styleFileName: 'style',
    exportType: ExportTypes.Default,
    propsList: [],
    componentName: 'App',
  },
  scriptContent: "afddf",
  styleContent: "adsfdf",
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
    deleteNode: (state,action) => {
      deleteNodeInTree(state.map, action.payload.key)
    },
    applyStyle: (state, action) => {
      const { key, value } = action.payload
      addStyleInNode(state.map, state.selectedKey, key, value)
    },
    updateConfig: (state, action) => {
      state.config[action.payload.key] = action.payload.value
      // this function only return the code for you to can see it 
      state.scriptContent = generateScript(state.config, state.map)
      state.styleContent = generateStyle(state.config, state.map) 
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
  updateTreeInputValue

} = counterSlice.actions
export default counterSlice.reducer


const ojb = {
  name: 'adfd',
  fun: () => {
    console.log(ojb.name)
  }
}