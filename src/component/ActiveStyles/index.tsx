import { useSelector, useDispatch } from "react-redux"
import { cssToCamelCase, findNodeInTree } from "../../helper"
import { removeStyle } from "../../redux/slice/app"
import { ChevronRight, X } from "react-feather"
import styles from "./styles.module.sass"
import { RootState, ComponentMember } from "../../types"
import { Title, Text, bgDark, scrollBarStyle} from '../Styled'
import styled from 'styled-components'
interface ItemProps {
    title: string,
    cssKey: string,
    cssValue: string
}

const Container = styled.div`
    background: ${bgDark};
    display: inline-flex;
    align-items: center;
    margin: 4px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 12px;
    svg {
        margin-left: 8px;
        cursor: pointer;
    }
`

const ActiveStylesItem = (props: ItemProps) => {
    const dispatch = useDispatch()
    const handleRemove = () => {
        const key = props.title.split(":")[0]
        dispatch(removeStyle(key))
    }

    return (
        <Container >
                <div>
                    <Text white={'white'}>{props.cssKey} : </Text>
                    <Text sucess>{props.cssValue}</Text>
                </div>
                <div>
                    <X size={14} onClick={handleRemove} color={'white'} />
                </div>

          
        </Container>
    )
}

const getStyles = (key: string, html: ComponentMember[]) => {
    const element = findNodeInTree(html, key)
    if (!element.props.style) return null
    else return element.props.style
}

const Cmp = styled.div`
    background-color: white;
    height: 50%;
    border-top: 4px solid #eee;
    border-right: 4px solid #eee;
    padding: 12px;
    overflow: auto;
    ${scrollBarStyle}
`

const ActiveStyles: React.FC = () => {
    const stylesList = useSelector((state: RootState) => {
        return getStyles(state.selectedKey, state.map)
    })

    let styleKeys = []
    if (stylesList) {
        styleKeys = Object.keys(stylesList)
    }

    return (
        <Cmp>
            <Title.Medium>Active styles</Title.Medium>
            <div>
                {styleKeys.length === 0 ? (
                    <span>You dont have any style at the moment</span>
                ) : (
                    styleKeys.map((key) => {
                        const cssKey = cssToCamelCase(key)
                        const cssValue = stylesList[key]
                        return (
                            <ActiveStylesItem
                                cssKey={cssKey}
                                cssValue={cssValue}
                                title={`${cssKey}: ${cssValue}`}
                                key={key}
                            />
                        )
                    })
                )}
            </div>
        </Cmp>
    )
}

export default ActiveStyles
