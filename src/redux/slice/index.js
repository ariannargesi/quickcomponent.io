import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import {findNodeInTree, deleteNodeInTree, addNodeInTree, addStyleInNode} from '../../helper'

function log (x) {
  console.log(current(x))
}

const initialState =  {
  selectedKey: 'TpBr6w7RzTKfFA0Um2BW5', 
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
          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h2",
          key: nanoid(),
          props: {},

          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h3",
          key: nanoid(),
          props: {},

          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h4",
          key: nanoid(),
          props: {},

          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h5",
          key: nanoid(),
          props: {},

          children: [{text: 'Hello world', key: nanoid() }]
        },
      ]
    }
  ]
}
    
const counterSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {     
      moveElementInTree: (state, action) => {
        const { dragKey, dropKey, dropPosition, dropToGap } = action.payload 
        findNodeInTree(state.map, dragKey, dargNode => {
          deleteNodeInTree(state.map, dragKey)
          addNodeInTree(state.map, dropKey, dropPosition, dargNode, dropToGap)
      })
      },
      changeSelectedElement: (state, action) => {
        state.selectedKey = action.payload.key 
      },
      applyStyle: (state, action) => {
        const {key, value} = action.payload 
        addStyleInNode(state.map, state.selectedKey,key, value)
      }
    },
})

export const { moveElementInTree, changeSelectedElement, applyStyle } = counterSlice.actions
export default counterSlice.reducer
