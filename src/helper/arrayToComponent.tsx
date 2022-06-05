import React, { useState, useEffect } from "react"
import { ComponentMember } from "../types"
import {
    updateTreeInputValue,
    changeSelectedElement,
    setInputAtKey,
    showErrorMessage,
} from "../redux/slice/app"
import { findNodeInTree, isContentEditable } from "."
import store from "../redux"
import styled from 'styled-components'
import styles from "../component/ComponentView/styles.module.sass"
import { useDispatch } from "react-redux"

const Erorr = styled.span`
    position: absolute;
    top: 0;
`

const Input = () => {
    const [ffff, setValue] = useState('')

    const handleKeyDown = event => {
        if (event.key === "Enter" && ffff){
            store.dispatch(setInputAtKey({key: null}))
            store.dispatch(
                updateTreeInputValue({
                    value: ffff,
                })
            )
        }
    }
    
    const handleChange = (event) => {
        const inputValue = event.target.value 
        if(/{|<|>|}/gm.test(inputValue) === false)
            setValue(inputValue)
    }

    const handleBlur = () => {
        console.log('this is output res')
        console.log(ffff)
        store.dispatch(setInputAtKey({key: null}))
        if (ffff) {
            store.dispatch(
                updateTreeInputValue({
                    value: ffff,
                })
            )
        }
    }


    return (
        <input
            className={styles.editInnerText}
            autoFocus
            value={ffff}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    )

}


const arrayToComponent = (
    map: ComponentMember[],
    inputKey: string,
    selectedKey: string, errorMessage
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
                    [
                        <Input/>
                    ]
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
                    arrayToComponent(element.children, inputKey, selectedKey, errorMessage)
                )
            )
    })
    
    return component
}

export default arrayToComponent
