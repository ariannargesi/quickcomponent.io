import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer as AntDrawer, List } from 'antd'
import { addNodeInTree, setInputAtKey, ComponentMember } from '../../redux/slice/app'
import elementsList from '../../data/html-elements'
import { nanoid } from '@reduxjs/toolkit'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import store, { RootState } from '../../redux'

function generateTextBasedElement(name: string): ComponentMember {
    // take html element name and return an object with ComponentMember
    name = name.toLowerCase()
    const innerTextKey = nanoid()
    const elementKey = nanoid()
    store.dispatch(setInputAtKey({ key: innerTextKey }))
    return {
        title: name,
        props: {},
        key: elementKey,
        children: name === 'div' ? [] : [{ text: 'Text', key: innerTextKey }]
    }
}

const Drawer = () => {
    const toggleDrawer = useToggleDrawer()
    const visible = useSelector((state: RootState) => state.app.openDrawer)
    const dispatch = useDispatch()

    const handleAddingChild = (name) => {
        dispatch(addNodeInTree({
            element: generateTextBasedElement(name)
        }))
        toggleDrawer()
    }
    return (

        <AntDrawer
            title="Elements List"
            placement="left"
            closable={true}
            visible={visible}
            onClose={() => toggleDrawer()}
        >
            <List
                dataSource={elementsList}
                renderItem={item => (
                    <List.Item onClick={() => handleAddingChild(item)}>{item}</List.Item>
                )}
            />
        </AntDrawer>
    )
}

export default Drawer