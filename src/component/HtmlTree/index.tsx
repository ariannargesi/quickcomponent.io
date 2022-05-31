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
import { fontFamily, Text, Title } from "../Styled"
import { MinusSquare, PlusSquare, Plus, Trash, ChevronRight, ChevronDown } from "react-feather"
import styled from "styled-components"
// if is a text based element show title and text inline > else show it seperetlay

import store from "../../redux"
import useToggleDrawer from "../../hooks/useToggleDrawer"


const Item = styled.div`
    width: 100px;
    display: flex;
    align-items: center;

    &:hover {
        background: lightblue;
    }
`

const FlexAlignCenter = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`
const Child = styled.div`
    padding-left: 15px;
`

const Tree = (props: { data: ComponentMember[]; padding?: boolean }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const map = store.getState().map
    const toggle = () => {
        setOpen(!open)
    }

    const handleClick = (element: ComponentMember) => {

        console.log(element)

        // if (isTextNode(data)) {
        //     const res = getElementParent(map, element.key)
        //     dispatch(changeSelectedElement({ key: res.key }))
        // } else dispatch(changeSelectedElement({ key: element }))
    }

    const handleDoubleClick = (element: ComponentMember) => {
        if (isTextBasedTag(element.title))
            dispatch(changeSelectedElement({ key: element.key }))
        else if (isTextNode(data)) {
            const res = getElementParent(map, element.key)
            dispatch(changeSelectedElement({ key: res.key }))
        }
    }

    const { data, padding } = props

    return (
        <>
            {data.map((item) => {
                return (
                    <>
                        <Item
                            
                            key={item.key}
                            onClick={() => handleClick(item)}
                            onDoubleClick={() => handleDoubleClick(item)}
                        >
                           
                        
                                
                                <div style={{width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                                {item.children && (
                                    <>
                                        {open ? (
                                            <ChevronDown
                                                onClick={toggle}
                                            />
                                        ) : (
                                            <ChevronRight
                                                onClick={toggle}
                                            />
                                        )}
                                    </>
                                )}
                                    {isTextBasedTag(item.title) ? (
                                        <>
                                            <Text bold>{item.title}</Text>
                                            {/* {item.text && <Text style={{display: 'inline-block', width: '100px', paddingLeft: '8px'}}> ({item.text}) </Text>} */}
                                        </>
                                    )
                                    :
                                    <>
                                        {item.text && <Text>{item.text}</Text>}
                                        {item.title && <Text bold>{item.title}</Text>}
                                    </>
                                    
                                
                                }
                                <Action
                                    elementKey={item.key}
                                    addChild={!!item.children}
                                />
                                </div>
                                
                                
                        </Item>
                        {open && (
                            <Child>
                                {item.children && (
                                    <Tree data={item.children} padding />
                                )}
                            </Child>
                        )}
                    </>
                )
            })}
        </>
    )
}

const TreeContainer = styled.div`
    height: 50%;
    overflow: scroll;
    background: white;
    font-family: ${fontFamily};
    font-size: 12px;
`

const Component = () => {
    const map = useSelector((state: RootState) => state.map)
    const toggleDrawer = useToggleDrawer()
    return (
        <TreeContainer>
            <Tree data={map} />
        </TreeContainer>
    )
}

export default Component
