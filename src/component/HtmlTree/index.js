import { nanoid } from '@reduxjs/toolkit'
import { Tree } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { moveElementInTree } from '../../redux/slice'

function formatData(html) {
        html.map((item, index) => {
            if(Array.isArray(item.children))
                formatData(item.children)    
            else if(item.text){
                item.title = item.text 
                delete item.text 
            }         
        })
     return html 
   }


const HtmlTree = () => {
    const dispatch = useDispatch()
    let html = useSelector(state => state.html)
    
    html = formatData(JSON.parse(JSON.stringify(html)))

    const onDrop = (info) => {
        console.log(info)
        const { key: dragKey } = info.dragNode 
        const {key: dropKey} = info.node 
        const { dropPosition, dropToGap } = info 
        console.log("Drag to gap from react: " + dropToGap)
        console.log(info)
        dispatch(moveElementInTree({
            dragKey,
            dropKey,
            dropPosition,
            dropToGap
        }))
    }

    return (
        <Tree
            treeData={html}
            draggable
            onDrop={onDrop}
        />
    )
}

export default HtmlTree 