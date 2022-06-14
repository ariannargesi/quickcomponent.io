import React, { useEffect, useState } from "react"
import { ComponentMember, RootState } from "../types"
import {
    updateTreeInputValue,
    changeSelectedElement,
    setInputAtKey,
} from "../redux/slice/app"
import { findNodeInTree, isContentEditable } from "."
import store from "../redux"
import styles from "../component/ComponentView/styles.module.sass"
import { useDispatch, useSelector } from "react-redux"

const Input = (props: { username: string }) => {
    const defaultText = useSelector((state: RootState) => {
        return findNodeInTree(state.map, state.selectedKey).text
    })

    const dispatch = useDispatch()
    const [value, setValue] = useState(defaultText)

    const dispatchValue = () => {
        dispatch(updateTreeInputValue({ value }))
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && value) {
            dispatchValue()
        }
    }

    const handleChange = (event) => {
        if (event.stopPropagation) event.stopPropagation()
        const inputValue = event.target.value
        if (/{|<|>|}/gm.test(inputValue) === false) setValue(inputValue)
    }

    const handleBlur = () => {
        if (value) dispatchValue()
    }

    const handleClick = (event) => {
        if(event.stopPropagation){
            event.stopPropagation()
        }
    }

    return (
        <span onClick={handleClick}>
            <input
                className={styles.editInnerText}
                autoFocus
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
        </span>
    )
}

const arrayToComponent = (
    map: ComponentMember[],
    inputKey: string,
    selectedKey: string
): React.ReactNode => {
    const component = []

    map.forEach((element) => {
        // This is for rendering the edit input
        if (inputKey === element.key) {
            const title = element.title
            const props = {
                key: element.key,
                style: element.props ? element.props.style : null,
            }
            component.push(
                React.createElement(title, props, <Input username="adfd" />)
            )
        } else if (element.text) {
            // This is for rendering text and the elements that won't contain any childs
            const title = element.title
            const text = element.text
            const props = {
                style: element.props
                    ? {
                          ...element.props.style,
                          outlineColor:
                              element.key === selectedKey
                                  ? "lightgreen"
                                  : "#c9c9c9",
                      }
                    : null,
                key: element.key,
                onClick: (e) => {
                    if (e.stopPropagation) e.stopPropagation()
                    store.dispatch(changeSelectedElement({ key: element.key }))
                },
                onDoubleClick: (e) => {
                    if (e.stopPropagation) e.stopPropagation()
                    if (isContentEditable(element.title))
                        store.dispatch(setInputAtKey({ key: element.key }))
                },
            }

            if (element.title === "text") {
                // @ts-ignore
                props.is = "text"
            }

            component.push(React.createElement(title, props, text))
        } else {
            // This is for containers and elements that might contain child
            const title = element.title
            const props = {
                style: {
                    ...element.props.style,
                    outlineColor:
                        element.key === selectedKey ? "lightgreen" : "#c9c9c9",
                },
                key: element.key,
                onClick: (e) => {
                    if (e.stopPropagation) e.stopPropagation()
                    store.dispatch(changeSelectedElement({ key: element.key }))
                },
            }
            component.push(
                React.createElement(
                    title,
                    props,
                    arrayToComponent(element.children, inputKey, selectedKey)
                )
            )
        }
    })

    return component
}

export default arrayToComponent
