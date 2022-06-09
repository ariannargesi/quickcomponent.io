import { useSelector, useDispatch } from "react-redux"
import { changeSelectedElement, setInputAtKey } from "../../redux/slice/app"
import Action from "./Action"
import { RootState, ComponentMember } from "../../types"
import { isTextNode, getElementParent, isTextBasedTag } from "../../helper"
import { useState } from "react"
import { fontFamily, Text, Title, TitleWrapper, Content } from "../Styled"
import { ChevronRight, ChevronDown } from "react-feather"
import styled from "styled-components"
import store from "../../redux"

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

const Child = styled.div`
    padding-left: 40px;
`

const TreeItem = (props) => {
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
    const dispatch = useDispatch()
    const map = store.getState().map

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

    const { data } = props

    return (
        <>
            {data.map((item) => {
                return (
                    <TreeItem
                        key={item.key}
                        item={item}
                        onClick={() => handleClick(item)}
                        onDoubleClick={() => handleDoubleClick(item)}
                    />
                )
            })}
        </>
    )
}

const TreeContainer = styled.div`
    height: 50%;
    background: white;
    font-family: ${fontFamily};
`

const Component = () => {
    const map = useSelector((state: RootState) => state.map)

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
