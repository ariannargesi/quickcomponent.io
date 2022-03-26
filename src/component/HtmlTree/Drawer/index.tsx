import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer as AntDrawer, List } from 'antd'
import { toggleElementsDrawer } from '../../../redux/ui'
import { addNodeInTree, showInputAtKey} from '../../../redux/slice'
import elementsList from '../../../data/html-elements'
import { nanoid } from '@reduxjs/toolkit'

import store from '../../../redux'



function generateTextBasedElement (name:string) {
   name = name.toLowerCase()
   const innerTextKey = nanoid()
   const elementKey = nanoid()

   // Error here
   store.dispatch(showInputAtKey({key: innerTextKey}))
   return {
       title: name,
       props: {},
       key: elementKey,
       children: [{ text: 'Text', key: innerTextKey }]
   }
}

const Drawer = () => {
    //@ts-ignore
    const visible = useSelector(state => state.ui.showElementDrawer)
    const dispatch = useDispatch()

    const toggleDrawer = () => dispatch(toggleElementsDrawer())

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
            closable={false}
            onClose={toggleDrawer}
            visible={visible}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <List
                size="small"
                dataSource={elementsList}
                renderItem={item => <List.Item onClick={() => {
                    handleAddingChild(item)
                }} >{item}</List.Item>} />
        </AntDrawer>


    )
}

export default Drawer