import React from 'react'
import { Plus, Trash} from 'react-feather'
import { useDispatch } from 'react-redux'
import { deleteNode, selectElementForAddingChild } from '../../../redux/slice'
import useToggleDrawer from '../../../hooks/useToggleDrawer'
import './styles.sass'
interface Props {
    elementKey: string,
}

const iconSize = 17

const Action = (props: Props) => {
    const toggleDrawer = useToggleDrawer()
    const dispatch = useDispatch()
    
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