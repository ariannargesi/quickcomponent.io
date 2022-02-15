import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import {findNodeInTree, deleteNodeInTree, addNodeInTree} from '../../helper'

function log (x) {
  console.log(current(x))
}

const initialState =  [
    {
      title: "div",
      key: "TpBr6w7RzTKfFA0Um2BW5",
      children: [
        {
          title: "h1",
          key: nanoid(),
          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h2",
          key: nanoid(),
          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h3",
          key: nanoid(),
          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h4",
          key: nanoid(),
          children: [{text: 'Hello world', key: nanoid() }]
        },
        {
          title: "h5",
          key: nanoid(),
          children: [{text: 'Hello world', key: nanoid() }]
        },
      ]
    }
  ]
    
const counterSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {     
      moveElementInTree: (state, action) => {
        const { dragKey, dropKey, dropPosition, dropToGap } = action.payload 
        findNodeInTree(state, dragKey, dargNode => {
          deleteNodeInTree(state, dragKey)
          console.log('Drop to gap from slice: ' + dropToGap)
          addNodeInTree(state, dropKey, dropPosition, dargNode, dropToGap)
      })
      }
    },
})

export const { moveElementInTree } = counterSlice.actions
export default counterSlice.reducer
