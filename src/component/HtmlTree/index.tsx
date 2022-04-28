import { Tree, Input } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {
    updateExpandedkeys,
    moveElementInTree,
    changeSelectedElement,
    updateTreeInputValue,
    clearInputAtKey,
    setInputAtKey,
} from "../../redux/slice/app"
import Action from "./Action"
import { RootState, ComponentMember } from "../../types"
import styles from "./styles.module.sass"
import { Icon } from "@mui/material"
import { Type } from 'react-feather'

function formatMap(html) {
    // convert html map to proper format for showign in antd tree component
    html.map((item) => {
        if (Array.isArray(item.children)) {
            formatMap(item.children)
        }
    })
    return html
}

const Title = (props: { data: ComponentMember }) => {
    // This component is responsible for rendering the title of tree members.
    // If the member is a text node, with clicking on it, the title get replaced with an input
    // and you can update the inner text
    // Also when user add a new element, an input apear and you can enter value as inner text for that element
    const dispatch = useDispatch()

    const { data } = props

    const handleClick = () => {
        if (data.text) 
            dispatch(changeSelectedElement({ key: data.key }))
        
    }

    const handleDoubleClick = () => {
        dispatch(setInputAtKey({key: data.key}))
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
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const { map, expandedKey } = app

    const formattedData = formatMap(JSON.parse(JSON.stringify(map)))
    console.log(formattedData)
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

    const handleElementSelection = (value, e) => {
        if (e.nativeEvent.srcElement.tagName != "DIV") return
        if (value.length != 0)
            dispatch(changeSelectedElement({ key: value[0] }))
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.mainTitle}>Elements</h2>
            <Tree
                showLine={false}
                showIcon={true}
                treeData={formattedData}
                expandedKeys={expandedKey}

                onExpand={(value) => {
                    dispatch(updateExpandedkeys(value))
                }}
                draggable
                onClick={e => console.log(e.target)}
                onDrop={handleElementsDragAndDrop}
                onSelect={handleElementSelection}
                titleRender={(nodeData: ComponentMember) => {
                    return <Title data={nodeData} />
                }}
            />
        </div>
    )
}

export default HtmlTree
