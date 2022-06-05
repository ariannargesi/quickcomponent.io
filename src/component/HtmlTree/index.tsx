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
import { fontFamily, Text, Title, TitleWrapper, Content } from "../Styled"
import {
    MinusSquare,
    PlusSquare,
    Plus,
    Trash,
    ChevronRight,
    ChevronDown,
} from "react-feather"
import styled from "styled-components"
import store from "../../redux"
import useToggleDrawer from "../../hooks/useToggleDrawer"

const size = 16

const Item = styled.div`
    width: 150px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
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
    padding-left: 40px;
`

const Item2 = (props) => {
    const { item, onClick, onDoubleClick } = props
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)

    const handleClick = () => {
        setOpen(!open)
        onClick()

    }

    return (
        <>
            <Item
                key={item.key}
                onClick={handleClick}
                onDoubleClick={onDoubleClick}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {item.children && (
                            <>
                                {open ? (
                                    <ChevronDown onClick={toggle} size={size} />
                                ) : (
                                    <ChevronRight
                                        onClick={toggle}
                                        size={size}
                                    />
                                )}
                            </>
                        )}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {item.title && <Text bold>{item.title}</Text>}
                            {item.text && (
                                <Text
                                    style={{
                                        maxWidth: "100px",
                                        minWidth: "100px",
                                        width: "100px",
                                        display: "inline-block",
                                        paddingLeft: "8px",
                                    }}
                                >{` (  ${item.text} ) `}</Text>
                            )}
                        </div>
                    </div>
                    <Action elementKey={item.key} addChild={!!item.children} />
                </div>
            </Item>
            {open && (
                <Child>
                    {item.children && <Tree data={item.children} padding />}
                </Child>
            )}
        </>
    )
}

const Tree = (props: { data: ComponentMember[]; padding?: boolean }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const map = store.getState().map
    const toggle = () => {
        setOpen(!open)
    }

    const handleClick = (element: ComponentMember) => {
            dispatch(changeSelectedElement({ key: element.key }))
    }

    const handleDoubleClick = (element: ComponentMember) => {
        if (isTextBasedTag(element.title))
            dispatch(setInputAtKey({ key: element.key }))
        else if (isTextNode(element)) {
            const res = getElementParent(map, element.key)
            dispatch(setInputAtKey({ key: res.key }))
        }
    }

    const { data, padding } = props

    return (
        <>
            {data.map((item) => {
                return (
                    <>
                        <Item2
                            item={item}
                            onClick={() => handleClick(item)}
                            onDoubleClick={() => handleDoubleClick(item)}
                        />
                    </>
                )
            })}
        </>
    )
}

const TreeContainer = styled.div`
    height: 50%;
    // overflow: scroll;
    background: white;
    font-family: ${fontFamily};
`

const Component = () => {
    const map = useSelector((state: RootState) => state.map)
    const toggleDrawer = useToggleDrawer()
    return (
        <TreeContainer>
            <TitleWrapper>
                <Title.Medium>Elements</Title.Medium>
            </TitleWrapper>
            <Content>
                <Tree data={map} />
            </Content>
        </TreeContainer>
    )
}

export default Component
