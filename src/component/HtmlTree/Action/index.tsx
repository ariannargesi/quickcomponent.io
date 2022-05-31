import { Plus, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import styled from 'styled-components'
import {
    deleteNode,
    selectElementForAddingChild,
} from "../../../redux/slice/app"
import useToggleDrawer from "../../../hooks/useToggleDrawer"

interface Props {
    elementKey: string
    addChild: boolean
}

const iconSize = 17


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

    function addElement() {
        dispatch(selectElementForAddingChild({ key }))
        toggleDrawer()
    }

    function removeElement(event) {
        event.stopPropagation()
        dispatch(deleteNode({ key }))
    }

    return (
        <Container>
            <Plus size={iconSize} onClick={addElement} />
            <Trash size={iconSize} onClick={removeElement}/>
        </Container>
    )
}

export default Action
