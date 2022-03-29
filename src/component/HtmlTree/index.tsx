import { Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateExpandedkeys, moveElementInTree, changeSelectedElement, updateTreeInputValue, clearInputAtKey, setInputAtKey } from '../../redux/slice'
import useEmptyTree from '../../hooks/useEmptyTree'
import Action from './Action'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import { Plus } from 'react-feather'
import styles from './styles.module.sass'
import EmptyTree from '../EmptyTree'
function formatData(html) {
    html.map((item, index) => {
        if (Array.isArray(item.children)) {
            formatData(item.children)
            item.icon = <Action elementKey={item.key} />
        }

        else if (item.text) {
            item.title = item.text
            delete item.text
        }
    })
    return html
}

const Title = (props: { data: any }) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const inputAtKey = useSelector(state => state.app.inputKey)
    const { data } = props

    const handleChange = (e) => {
        const value = e.target.value
        dispatch(updateTreeInputValue({
            value
        }))
    }

    const claerInputAtKey = () => {
        dispatch(clearInputAtKey())
    }



    if (data.key === inputAtKey)
        return (
            <>
                <input onChange={handleChange} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        dispatch(clearInputAtKey())
                    }
                }} autoFocus />
                <button onClick={claerInputAtKey}>Okay</button>
            </>
        )

    return (
        <span onClick={() => {
            dispatch(setInputAtKey({
                key: data.key
            }))
        }}>{data.title}</span>
    )
}


const HtmlTree: React.ReactNode = () => {

    const toggleDrawer = useToggleDrawer()
    const emptyTree = useEmptyTree()
    const dispatch = useDispatch()
    //@ts-ignore
    let html = useSelector(state => state.app.map)
    //@ts-ignore
    const expandedKey = useSelector(state => state.app.expandedKey)
    //@ts-ignore
    html = formatData(JSON.parse(JSON.stringify(html)))

    const handleElementsDragAndDrop = (info) => {

        const { key: dragKey } = info.dragNode
        const { key: dropKey } = info.node
        const { dropPosition, dropToGap } = info

        dispatch(moveElementInTree({
            dragKey,
            dropKey,
            dropPosition,
            dropToGap
        }))
    }

    const handleElementSelect = (value) => {
        if (value.length != 0)
            dispatch(changeSelectedElement({ key: value[0] }))
    }

    const handleClick = () => {
        toggleDrawer()
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Elements</h2>
            <Tree
                showIcon={true}
                showLine={true}
                treeData={html}
                expandedKeys={expandedKey}
                onExpand={value => {
                    dispatch(updateExpandedkeys(value))
                }}
                draggable
                onDrop={handleElementsDragAndDrop}
                onSelect={handleElementSelect}
                titleRender={nodeData => <Title data={nodeData} />}
            />
        </div>
    )
}

export default HtmlTree 