import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer as AntDrawer, List } from 'antd'
import { addNodeInTree, setInputAtKey} from '../../../redux/slice'
import elementsList from '../../../data/html-elements'
import { nanoid } from '@reduxjs/toolkit'
import useToggleDrawer from '../../../hooks/useToggleDrawer'
import store from '../../../redux'



function generateTextBasedElement (name:string) {
   name = name.toLowerCase()
   const innerTextKey = nanoid()
   const elementKey = nanoid()

   // Error here
   store.dispatch(setInputAtKey({key: innerTextKey}))
   return {
       title: name,
       props: {},
       key: elementKey,
       children: [{ text: 'Text', key: innerTextKey }]
   }
}

const Drawer = () => {
    const toggleDrawer = useToggleDrawer()
    //@ts-ignore
    const visible = useSelector(state => state.app.openDrawer)
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
            closable={false}
            visible={visible}
            getContainer={false}
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