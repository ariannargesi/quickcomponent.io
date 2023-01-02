import { useState, useRef } from "react"
import { baseRadius, Button } from "../Styled"
import useClickoutsdie from "../../hooks/useClickoutside"
import { X } from "react-feather"
import styled from "styled-components"
import { Title } from "../Styled"
import Form from "./Form"
import PropsList from "./PropsList"
import { useDispatch } from "react-redux"
import { generateCode } from "../../redux/slice/app"

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

const PropConfig = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const modalRef = useRef(null)

    useClickoutsdie(modalRef, () => {
        setModal(false)
    })

    const toggle = () => setModal(!modal)

    const closeModal = () => {
        setModal(false)
        dispatch(generateCode())
    }

    return (
        <div>
            <Button full onClick={toggle}>
                Open props settings
            </Button>
            {modal && (
                <PageWrapper>
                    <ModalContainer ref={modalRef}>
                        <Header>
                            <Title.Medium>Props config</Title.Medium>
                            <X onClick={closeModal} />
                        </Header>
                        <ModalContent>
                            <Form />
                            <div>
                                <PropsList />
                            </div>
                        </ModalContent>
                    </ModalContainer>
                </PageWrapper>
            )}
        </div>
    )
}

export default PropConfig
