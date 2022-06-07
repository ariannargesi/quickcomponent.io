import { scrollBarStyle, Text } from "../../Styled"
import { Trash } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../types"
import { deleteProp } from "../../../redux/slice/app"
import styled from "styled-components"

const Container = styled.div`
    height: 300px;
`

const Row = styled.div`
    display: flex;
    height: 50px;
`
const Item = styled.div`
    width: 150px;
    overflow: auto;
    padding: 0 16px;
`
const Body = styled.div`
    height: 90%;
    overflow: auto;
    ${scrollBarStyle}
`

const PropsList = () => {
    const dispatch = useDispatch()
    const propsList = useSelector((state: RootState) => state.config.propsList)

    const handleDeleteProp = (index: number) => {
        dispatch(deleteProp({ index }))
    }

    return (
        <Container>
            <Row>
                <Item>
                    <Text bold>Name</Text>
                </Item>
                <Item>
                    <Text bold>Type</Text>
                </Item>
                <Item>
                    <Text bold>Type</Text>
                </Item>
            </Row>
            <Body>
                {propsList.map((item, index) => {
                    return (
                        <Row key={item.name}>
                            <Item>
                                <Text>{item.name}</Text>
                            </Item>
                            <Item>
                                <Text>{item.type}</Text>
                            </Item>
                            <Item>
                                <Text>{item.required ? "True" : "False"}</Text>
                            </Item>
                            <Item>
                                <Trash
                                    onClick={() => handleDeleteProp(index)}
                                />
                            </Item>
                        </Row>
                    )
                })}
            </Body>
        </Container>
    )
}

export default PropsList
