import React from 'react'
import { Tree, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateExpandedkeys, moveElementInTree, changeSelectedElement, updateTreeInputValue, clearInputAtKey, setInputAtKey } from '../../redux/slice/app'
import Action from './Action'
import { RootState } from '../../redux'
import styles from './styles.module.sass'

function formatMap(html) {
    // convert html map to proper format for showign in antd tree component 
    html.map((item) => {
        if (Array.isArray(item.children)) {
            formatMap(item.children)
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

    const handleInputChange = (e) => {
        const value = e.target.value
        dispatch(updateTreeInputValue({
            value
        }))
    }

    const handleTitleClick = () => {
        if (data.text)
            dispatch(setInputAtKey({key: data.key}))
    }

    const disableInput = () => {
        dispatch(clearInputAtKey())
    }

    if (data.key === inputAtKey)
        return (
            <>
                <Input
                    onChange={handleInputChange}
                    onBlur={() => disableInput()}
                    onKeyPress={event => {
                        if (event.key === 'Enter')
                            disableInput()
                    }}
                    autoFocus
                />
            </>
        )

    return (
        <div>
            <span onClick={handleTitleClick}>{data.title}</span>
            <Action elementKey={data.key} />
        </div>

    )
}

const HtmlTree = () => {

    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const { map, expandedKey } = app

    let formattedData = formatMap(JSON.parse(JSON.stringify(map)))

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

    const handleElementSelection = (value, e) => {
        console.log("Tagname")
        if (e.nativeEvent.srcElement.tagName != 'DIV')
            return
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
                onSelect={handleElementSelection}
                titleRender={nodeData => <Title data={nodeData} />}
            />
        </div>
    )
}

export default HtmlTree 