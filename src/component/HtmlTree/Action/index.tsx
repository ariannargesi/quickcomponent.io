import { Plus, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import {
    deleteNode,
    selectElementForAddingChild,
} from "../../../redux/slice/app"
import useToggleDrawer from "../../../hooks/useToggleDrawer"

import "./styles.sass"
interface Props {
    elementKey: string,
    addChild: boolean 
}

const iconSize = 17

const Action = (props: Props) => {
    const toggleDrawer = useToggleDrawer()
    const dispatch = useDispatch()
    const key = props.elementKey

    function addChild() {
        dispatch(selectElementForAddingChild({ key }))
        toggleDrawer()
    }

    function removeElement(event) {
        event.stopPropagation()
        dispatch(deleteNode({ key }))
    }

    return (
        <span className={"tree-item-action"}>            
             {props.addChild && <Plus onClick={addChild} size={iconSize} /> } 
             <Trash onClick={removeElement} size={iconSize} /> 
        </span>
    )
}

export default Action
