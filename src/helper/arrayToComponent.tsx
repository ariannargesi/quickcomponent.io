import React from 'react'
import { ComponentMember } from '../types'
import { updateTreeInputValue, changeSelectedElement, setInputAtKey } from '../redux/slice/app'
import { isContentEditable } from '.'
import store from '../redux'

import styles from '../component/ComponentView/styles.module.sass'

const arrayToComponent = (map: ComponentMember[], inputKey: string, selectedKey: string): React.ReactNode => {

    const component = []
    let inputValue = ''
    
    map.forEach((element) => {
        if (inputKey === element.key) {
            component.push(React.createElement(
                element.title,
                {
                    style: element.props.style,
                    key: element.key,
                },
                [
                    React.createElement('input', 
                        { 
                            
                            key: element.key,
                            className: styles.editInnerText,
                            autoFocus: true, 
                            onKeyDown: (event) => {
                                if(event.key === 'Enter' && inputValue)
                                    store.dispatch(updateTreeInputValue({value: inputValue }))
                            },
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value 
                                inputValue = value 
                            },
                            onBlur: () => {
                                if(inputValue) {
                                    store.dispatch(updateTreeInputValue({value: inputValue }))
                                }
                            },
                        })
                ]
            ))
        }

        else if (element.text) {
                if(element.title){
                    component.push(React.createElement(
                        element.title,
                        {
                            style: {...element.props.style, outlineColor: element.key === selectedKey ? 'lightgreen' : '#c9c9c9'},
                            key: element.key,
                            onClick: (e) => {
                                if (e.stopPropagation)
                                    e.stopPropagation()
                                store.dispatch(changeSelectedElement({ key: element.key }))
                            
                            },
                            onDoubleClick: (e) => {
                                if (e.stopPropagation)
                                    e.stopPropagation()
                                if(isContentEditable(element.title))
                                    store.dispatch(setInputAtKey({ key: element.key }))
                            }
                        },
                        element.text
                    ))
                }
                else 
                    component.push(element.text)                
        }

        else
            component.push(React.createElement(
                element.title,
                {
                    style: {...element.props.style, outlineColor: element.key === selectedKey ? 'lightgreen' : '#c9c9c9'},
                    key: element.key,
                    onClick: (e) => {
                        if (e.stopPropagation)
                            e.stopPropagation()
                        store.dispatch(changeSelectedElement({ key: element.key }))
                    },
                    onDoubleClick: (e) => {
                        if (e.stopPropagation)
                            e.stopPropagation()
                        if(isContentEditable(element.title))
                            store.dispatch(setInputAtKey({ key: element.key }))
                    }
                },
                arrayToComponent(element.children, inputKey, selectedKey)
            ))
    })
    return component
    
}

export default arrayToComponent