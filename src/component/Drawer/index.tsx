import { useSelector, useDispatch } from "react-redux"
import { Drawer as AntDrawer, List } from "antd"
import { addNodeInTree, setInputAtKey } from "../../redux/slice/app"
import elementsList from "../../data/html-elements"
import { nanoid } from "@reduxjs/toolkit"
import useToggleDrawer from "../../hooks/useToggleDrawer"
import store from "../../redux"
import { RootState, ComponentMember, HtmlElement } from "../../types"
import { isTextBasedTag } from "../../helper"
import EmptyTree from "../EmptyTree"

function genereateElement(name: string): ComponentMember {
    // take html element name and return an object with ComponentMember    
    name = name.toLowerCase()
    const elementKey = nanoid()
    const innerKey = nanoid()
    
    if(isTextBasedTag(name) || name === 'button')
        store.dispatch(setInputAtKey({ key: elementKey }))
    if(name === 'text'){
        return {
            text: 'text',
            key: elementKey
        }
    }
    if(isTextBasedTag(name))
        return {
            title: name,
            props: {
                className: name + "_" + nanoid(6),
               
            },
            key: elementKey,
            text: 'Text', 
        }
    else {
        return {
            title: name,
            props: {
                className: name + "_" + nanoid(6),
                
            },
            key: elementKey,
            children: [{text: 'ff', key: innerKey}], 
        }
    }
}

const Drawer = () => {
    const toggleDrawer = useToggleDrawer()
    const visible = useSelector((state: RootState) => state.app.openDrawer)
    const empty = useSelector((state: RootState) => state.app.emptyTree)
    const dispatch = useDispatch()


    const handleAddingChild = (name) => {
        dispatch(
            addNodeInTree({
                element: genereateElement(name),
            })
        )
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
                dataSource={empty ? elementsList.filter(element => element.tag != 'text') : elementsList}
                renderItem={(item: HtmlElement) => (
                    <List.Item onClick={() => handleAddingChild(item.tag)}>
                        {item.tag}
                    </List.Item>
                )}
            />
        </AntDrawer>
    )
}

export default Drawer
