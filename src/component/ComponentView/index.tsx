import FormItemInput from 'antd/lib/form/FormItemInput'
import React from 'react'
import { AlignJustify } from 'react-feather'
import { useDispatch, useSelector } from "react-redux"
import { findNodeText, isContentEditable } from '../../helper'
import { changeSelectedElement, setInputAtKey, updateTreeInputValue, clearInputAtKey } from '../../redux/slice/app'
import { RootState, ComponentMember } from "../../types"

import styles from './styles.module.sass'




const ComponentView = () => {
    const {map, inputKey, selectedKey} = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()

    const arrayToComponent = (map: ComponentMember[], fromInput = false): React.ReactNode => {
        let temp = ''
        const value = []
        map.forEach((el) => {
            if (inputKey === el.key) {
                let nodeText 
                findNodeText(map, el.key, (res) => {
                    nodeText = res 
                    console.log('This is result ',nodeText )
                })
                value.push(React.createElement(
                    el.title,
                    {
                        style: el.props.style,
                        key: el.key,
                    },
                    [
                        React.createElement('input', 
                            { 
                                autoFocus: true, 
                                defaultValue: nodeText,
                                className: styles.editInnerText,
                                onKeyDown: (e ) => {
                                    if(e.key === 'Enter')
                                        dispatch(updateTreeInputValue({value: temp }))
                                },
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value 
                                    temp = value 
                                },
                            
                                onBlur: (e ) => {
                                    if(temp)
                                        dispatch(updateTreeInputValue({value: temp }))
                                        dispatch(changeSelectedElement({key: null}))
                                        
                                },

                            })
                    ]
                ))
            }



            else if (el.text) {
                    if(el.title){
                        value.push(React.createElement(
                            el.title,
                            {
                                style: {...el.props.style, outlineColor: el.key === selectedKey ? 'lightgreen' : '#c9c9c9'},
                                key: el.key,
                                onClick: (e) => {
                                    if (e.stopPropagation)
                                        e.stopPropagation()
                                    dispatch(changeSelectedElement({ key: el.key }))
                                
                                },
                                onDoubleClick: (e) => {
                                    if (e.stopPropagation)
                                        e.stopPropagation()
                                    if(isContentEditable(el.title))
                                        dispatch(setInputAtKey({ key: el.key }))
                                }
                            },
                            el.text
                        ))
                    }
                    else {
                        if(fromInput === false)
                        value.push(el.text)
                    }
                    
            }

            else
                value.push(React.createElement(
                    el.title,
                    {
                        style: {...el.props.style, outlineColor: el.key === selectedKey ? 'lightgreen' : '#c9c9c9'},
                        key: el.key,
                        onClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            dispatch(changeSelectedElement({ key: el.key }))
                        
                        },
                        onDoubleClick: (e) => {
                            if (e.stopPropagation)
                                e.stopPropagation()
                            if(isContentEditable(el.title))
                                dispatch(setInputAtKey({ key: el.key }))
                        }
                    },
                    arrayToComponent(el.children)
                ))
        })
        return value
    }

    const component = arrayToComponent(map)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header }>
                <h2>Component view</h2>
            </div>
        <div className={styles.container}>
            <div className={styles.content}>
                {component}
            </div>
        </div>
        </div>
    )
        
}

export default ComponentView
