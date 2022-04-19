import { Plus, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import {
    deleteNode,
    selectElementForAddingChild,
} from "../../../redux/slice/app"
import useToggleDrawer from "../../../hooks/useToggleDrawer"
import { isContentEditable, isTextOnly } from "../../../helper"

import "./styles.sass"
interface Props {
    elementKey: string,
    title: string 
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

    function removeElement() {
        dispatch(deleteNode({ key }))
    }
    console.log(props.title)
    return (
        <div className={"tree-item-action"}>
            
            {props.title && isTextOnly(props.title) === false && <Plus onClick={addChild} size={iconSize} /> }
            {props.title != null && <Trash onClick={removeElement} size={iconSize} /> }
            
        </div>
    )
}

export default Action
