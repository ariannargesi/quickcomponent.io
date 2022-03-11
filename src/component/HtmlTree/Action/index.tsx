import React from 'react'
import {Copy, Plus, Trash} from 'react-feather'
import style from './style.module.sass'
import { deleteNode, selectElementForAddingChild } from '../../../redux/slice'
import { toggleElementsDrawer } from '../../../redux/ui'

import { useDispatch } from 'react-redux'
interface Props {

    elementKey: string,
}

const Action = (props: Props) => {
    const dispatch = useDispatch()
    const iconSize = 20
    const key = props.elementKey
    function addChild (){
        dispatch(selectElementForAddingChild({key}))
        dispatch(toggleElementsDrawer())
    }
    function removeElement(){
        dispatch(deleteNode({key}))
    }
    function copyElement(){

    } 

    return (
        <div className={style.container}>
            <div>
            <Plus onClick={addChild} size={iconSize}/>
            </div>
            <div>
            <Copy onClick={copyElement} size={iconSize}/>
            </div>
            <div>
            <Trash onClick={removeElement} size={iconSize}/>
            </div>
        </div>

    )
}

export default Action 