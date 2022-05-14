import { Tree, Input } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {
    updateExpandedkeys,
    moveElementInTree,
    changeSelectedElement,
    setInputAtKey,
} from "../../redux/slice/app"
import Action from "./Action"
import { RootState, ComponentMember } from "../../types"
import styles from "./styles.module.sass"
import { isTextNode, getElementParent, isTextBasedTag } from "../../helper"
import { useEffect, useState } from "react"

import store from '../../redux'
const Title = (props: { data: ComponentMember }) => {
    // This component is responsible for rendering the title of tree members.
    // If the member is a text node, with clicking on it, the title get replaced with an input
    // and you can update the inner text
    // Also when user add a new element, an input apear and you can enter value as inner text for that element
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const { data } = props    
    
    const handleClick = () => {
        if(isTextNode(data)) {
            const res = getElementParent(app.map, data.key)
            dispatch(changeSelectedElement({key: res.key}))
        }
        else 
            dispatch(changeSelectedElement({ key: data.key }))        
    }

    const handleDoubleClick = () => {
        if(isTextBasedTag(data.title))
                dispatch(setInputAtKey({key: data.key}))
        else if(isTextNode(data)) {
            const res = getElementParent(app.map, data.key)
            dispatch(setInputAtKey({key: res.key}))
        }
    }

    return (
        <div 
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <span className={styles.title}>
                <b>{data.title}</b>
                <i>{data.text ? ` ( ${data.text}` : ''}</i>
            </span>
            <Action elementKey={data.key} addChild={!data.text} />
        </div>
    )
}

const HtmlTree = () => {

    const [state, setState] = useState([])

    const treeHash = useSelector((state: RootState) => state.app.treeHash)
    const expandedKey = useSelector((state: RootState) => state.app.expandedKey)
    const rootKey = useSelector((state: RootState) => state.app.map[0].key)

    useEffect(() => {
        setTimeout(() => {
            dispatch(updateExpandedkeys([rootKey]))
        }, 1000)
    }, [])

    useEffect(() => {
        setState(store.getState().app.map)
    }, [])

    useEffect(() => {
        setState(store.getState().app.map)
    }, [treeHash])

    const dispatch = useDispatch()
   
    const handleElementsDragAndDrop = (info) => {
        const { key: dragKey } = info.dragNode
        const { key: dropKey } = info.node
        const { dropPosition, dropToGap } = info

        dispatch(
            moveElementInTree({
                dragKey,
                dropKey,
                dropPosition,
                dropToGap,
            })
        )
    }

    return (
        <div className={styles.container}>
            <h2>Elements</h2>
            <Tree    
                treeData={state}
                expandedKeys={expandedKey}
                onExpand={(value) => {
                    dispatch(updateExpandedkeys(value))
                }}
                draggable
                onDrop={handleElementsDragAndDrop}
                titleRender={(nodeData: ComponentMember) => {
                    return <Title data={nodeData} />
                }}
            />
        </div>
    )
}

export default HtmlTree
