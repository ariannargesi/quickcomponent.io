import { useState, useRef } from "react"
import { baseRadius, Button, Input } from "../Styled"
import useClickoutsdie from '../../hooks/useClickoutside'
import { useSelector } from "react-redux"
import isVarName from "is-var-name"
import { Trash, X } from "react-feather"
import { PropItem, RootState, ScriptFormats, prop_types } from "../../types"
import styles from "./styles.module.sass"
import styled from "styled-components"
import Select from "../Select"
import Switch from "../Switch"
import { Text, Title } from "../Styled"
import Form from './Form'
import PropsList from './PropsList'
interface Prop {
    onConfirm: (list: PropItem[]) => void
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 16px;
    svg {
        cursor: pointer;
    }
`
const ModalContainer = styled.div`
    background: white;
    width: 756px;
    height: 500px;
    border-radius: ${baseRadius};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ModalContent = styled.div`
    padding: 16px;
    height: 100%;
`

const PageWrapper = styled.div`
    background: rgba(11, 11, 11, 0.5);
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`

const PropConfig = (props: Prop) => {
    const [modal, setModal] = useState(false)
   



 

   
    const modalRef = useRef(null)

    useClickoutsdie(modalRef, () => {
        setModal(false)
    })
    

    

   

    const toggle = () => setModal(!modal)

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div>
            <Button full onClick={toggle}>Open props settings</Button>
            {modal && (
                <PageWrapper>
                    <ModalContainer ref={modalRef}>
                        <Header>
                            <Title.Medium>Props config</Title.Medium>
                            <X onClick={closeModal}/>
                        </Header>
                        <ModalContent>
                            <Form/>
                            <div>
                                <PropsList/>
                            </div>
                        </ModalContent>
                      
                    </ModalContainer>
                </PageWrapper>
            )}
        </div>
    )
}


export default PropConfig
