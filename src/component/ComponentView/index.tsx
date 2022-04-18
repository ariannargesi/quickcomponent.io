import FormItemInput from 'antd/lib/form/FormItemInput'
import React from 'react'
import { AlignJustify } from 'react-feather'
import { useDispatch, useSelector } from "react-redux"
import { findNodeText, updateNodeTitle } from '../../helper'
import { changeSelectedElement, setInputAtKey, updateTreeInputValue, clearInputAtKey } from '../../redux/slice/app'
import { RootState, ComponentMember } from "../../types"
import styles from './styles.module.sass'




const ComponentView = () => {
    const html = useSelector((state: RootState) => state.app.map)
    const inputAtKey = useSelector((state: RootState) => state.app.inputKey)
    const dispatch = useDispatch()

    const arrayToComponent = (map: ComponentMember[], fromInput = false): React.ReactNode => {

        const value = []
        map.forEach((el) => {
            if (inputAtKey === el.key) {
                let nodeText 
                findNodeText(html, el.key, (res) => {
                    nodeText = res 
                    
                })
               
                value.push(React.createElement(
                    el.title,
                    {
                        style: el.props.style,
                        key: el.key,
                        onClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            dispatch(changeSelectedElement({ key: el.key }))
                        },
                        onDoubleClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            dispatch(setInputAtKey({ key: el.key }))
                        }
                    },
                    [
                        React.createElement('input', 
                            { 
                                style: el.props.style,
                                value: nodeText, 
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value 
                                    dispatch(updateTreeInputValue({value: value }))
                                }
                            }), 
                        arrayToComponent(el.children, true)
                    ]
                ))
            }

            else if (el.text) {
                    if(fromInput === false)
                        value.push(el.text)
            }

            else
                value.push(React.createElement(
                    el.title,
                    {
                        style: el.props.style,
                        key: el.key,
                        onClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            dispatch(changeSelectedElement({ key: el.key }))
                        },
                        onDoubleClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            dispatch(setInputAtKey({ key: el.key }))
                        }
                    },
                    arrayToComponent(el.children)
                ))
        })
        return value
    }

    const component = arrayToComponent(html)

    return (
        <div
            style={{
                padding: "16px",
                height: "100%",
                display: "flex",
                flex: "1",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <h2>Component view</h2>
            {/* allow scroll when compnent get big
                while users can see component title */}
            <div
                style={{
                    overflow: "scroll",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className={styles.container}
            >
                {component}
            </div>
        </div>
    )
}

export default ComponentView
