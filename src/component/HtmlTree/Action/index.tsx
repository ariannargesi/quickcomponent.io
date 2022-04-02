import React from 'react'
import {Clipboard, Plus, Trash} from 'react-feather'
import './styles.sass'
import { deleteNode, selectElementForAddingChild, toggleDrawer } from '../../../redux/slice'
import useToggleDrawer from '../../../hooks/useToggleDrawer'
import { useDispatch } from 'react-redux'
interface Props {

    elementKey: string,
}

const Action = (props: Props) => {
    const toggleDrawer = useToggleDrawer()
    const dispatch = useDispatch()
    const iconSize = 17
    const key = props.elementKey
    function addChild (){
        dispatch(selectElementForAddingChild({key}))
        toggleDrawer()
        
    }
    function removeElement(){
        dispatch(deleteNode({key}))
    }
    

    return (
        <div className={'tree-item-action'}>
            <Plus onClick={addChild} size={iconSize}/>
            <Trash onClick={removeElement} size={iconSize}/>
        </div>

    )
}

export default Action 