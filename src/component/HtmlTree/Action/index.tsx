import React, { useEffect } from "react"
import { Plus, Trash } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../types"
import {
    deleteNode,
    selectElementForAddingChild,
} from "../../../redux/slice/app"
import useToggleDrawer from "../../../hooks/useToggleDrawer"
import "./styles.sass"
interface Props {
    elementKey: string
}

const iconSize = 17
const Action = (props: Props) => {
    const toggleDrawer = useToggleDrawer()
    const dispatch = useDispatch()
    const selectedKey = useSelector((State: RootState) => State.app.selectedKey)
    const key = props.elementKey

    function addChild() {
        dispatch(selectElementForAddingChild({ key }))
        toggleDrawer()
    }

    function removeElement() {
        dispatch(deleteNode({ key }))
    }

    return (
        <div className={"tree-item-action"}>
            <Plus onClick={addChild} size={iconSize} />
            <Trash onClick={removeElement} size={iconSize} />
        </div>
    )
}

export default Action
