import { ChevronDown, ChevronRight } from 'react-feather'
import styled from 'styled-components'
import { Text } from '../Styled'

interface Props {
    state: boolean,
    onClick: () => void 
}

const size = 20

const Container = styled.div`
    display: flex;
    align-items: center;
`

const ShowMore = (props: Props) => {
    return (
        <Container onClick={props.onClick}>
            <Text>More</Text>
            {props.state ? <ChevronDown size={size}/> : <ChevronRight size={size}/>}
        </Container>
    )
}

export default ShowMore