import React, { useState } from "react"
import { ComponentMember } from "../types"
import {
    updateTreeInputValue,
    changeSelectedElement,
    setInputAtKey,
} from "../redux/slice/app"
import { isContentEditable } from "."
import store from "../redux"
import styles from "../component/ComponentView/styles.module.sass"
import { useDispatch } from "react-redux"

const Input = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")

    const dispatchValue = () => {
        dispatch(updateTreeInputValue({ value }))
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && value) {
            dispatch(setInputAtKey({ key: null }))
            dispatchValue()
        }
    }

    const handleChange = (event) => {
        const inputValue = event.target.value
        if (/{|<|>|}/gm.test(inputValue) === false) setValue(inputValue)
    }

    const handleBlur = () => {
        dispatch(setInputAtKey({ key: null }))
        if (value) dispatchValue()
    }

    return (
        <input
            className={styles.editInnerText}
            autoFocus
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    )
}

const arrayToComponent = (
    map: ComponentMember[],
    inputKey: string,
    selectedKey: string
): React.ReactNode => {
    const component = []

    map.forEach((element) => {
        if (inputKey === element.key) {
            component.push(
                React.createElement(
                    element.title,
                    {
                        style: element.props.style,
                        key: element.key,
                    },
                    [<Input key={element.key} />]
                )
            )
        } else if (element.text) {
            if (element.title) {
                component.push(
                    React.createElement(
                        element.title,
                        {
                            style: {
                                ...element.props.style,
                                outlineColor:
                                    element.key === selectedKey
                                        ? "lightgreen"
                                        : "#c9c9c9",
                            },
                            key: element.key,
                            onClick: (e) => {
                                if (e.stopPropagation) e.stopPropagation()
                                store.dispatch(
                                    changeSelectedElement({ key: element.key })
                                )
                            },
                            onDoubleClick: (e) => {
                                if (e.stopPropagation) e.stopPropagation()
                                if (isContentEditable(element.title))
                                    store.dispatch(
                                        setInputAtKey({ key: element.key })
                                    )
                            },
                        },
                        element.text
                    )
                )
            } else component.push(element.text)
        } else
            component.push(
                React.createElement(
                    element.title,
                    {
                        style: {
                            ...element.props.style,
                            outlineColor:
                                element.key === selectedKey
                                    ? "lightgreen"
                                    : "#c9c9c9",
                        },
                        key: element.key,
                        onClick: (e) => {
                            if (e.stopPropagation) e.stopPropagation()
                            store.dispatch(
                                changeSelectedElement({ key: element.key })
                            )
                        },
                        onDoubleClick: (e) => {
                            if (e.stopPropagation) e.stopPropagation()
                            if (isContentEditable(element.title))
                                store.dispatch(
                                    setInputAtKey({ key: element.key })
                                )
                        },
                    },
                    arrayToComponent(element.children, inputKey, selectedKey)
                )
            )
    })

    return component
}

export default arrayToComponent
