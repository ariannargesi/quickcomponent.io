import React from 'react'
import { Tree, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateExpandedkeys, moveElementInTree, changeSelectedElement, updateTreeInputValue, clearInputAtKey, setInputAtKey } from '../../redux/slice'
import useEmptyTree from '../../hooks/useEmptyTree'
import Action from './Action'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import { RootState } from '../../redux'
import styles from './styles.module.sass'

function formatData(html) {
    html.map((item) => {
        if (Array.isArray(item.children)) {
            formatData(item.children)
            item.icon = <Action elementKey={item.key} />
        }
        else if (item.text)
            item.title = item.text
    })
    return html
}

const Title = (props: { data: any }) => {
    // This component is responsible for rendering the title of tree members. 
    // If the member is a text node, with clicking on it, the title get replaced with an input
    // and you can update the inner text
    // Also when user add a new element, an input apear and you can enter value as inner text for that element
    const dispatch = useDispatch()
    const inputAtKey = useSelector((state: RootState) => state.app.inputKey)

    const { data } = props

    const handleChange = (e) => {
        const value = e.target.value
        dispatch(updateTreeInputValue({
            value
        }))
    }

    const clear = () => {
        dispatch(clearInputAtKey())
    }

    if (data.key === inputAtKey)
        return (
            <>
                <Input onChange={handleChange} onBlur={() => clear()} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        clear()
                    }
                }} autoFocus />
            </>
        )

    return (
        <span onClick={() => {
            if (data.text)
                dispatch(setInputAtKey({
                    key: data.key
                }))
        }}>{data.title}</span>
    )
}

const HtmlTree = () => {

    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const {map, expandedKey} = app 
  
    let formattedData = formatData(JSON.parse(JSON.stringify(map)))

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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Elements</h2>
            <Tree
                showIcon={true}
                showLine={true}
                treeData={formattedData}
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