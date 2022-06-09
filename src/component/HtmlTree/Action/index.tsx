import { Plus, X } from "react-feather"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
    deleteNode,
    selectElementForAddingChild,
} from "../../../redux/slice/app"
import useToggleDrawer from "../../../hooks/useToggleDrawer"

interface Props {
    elementKey: string
    addChild: boolean
}

export const iconSize = 16
export const iconColor = "#626262"

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 40px;
    justify-content: space-between;
`

const Action = (props: Props) => {
    const dispatch = useDispatch()
    const toggleDrawer = useToggleDrawer()

    const key = props.elementKey

    function addElement(event) {
        event.stopPropagation()
        dispatch(selectElementForAddingChild({ key }))
        toggleDrawer()
    }

    function removeElement(event) {
        event.stopPropagation()
        dispatch(deleteNode({ key }))
    }

    return (
        <Container>
            <Plus size={iconSize} color={iconColor} onClick={addElement} />
            <X size={iconSize} color={iconColor} onClick={removeElement} />
        </Container>
    )
}

export default Action
