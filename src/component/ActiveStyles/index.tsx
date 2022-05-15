import { useSelector, useDispatch } from "react-redux"
import { cssToCamelCase, findNodeInTree } from "../../helper"
import { removeStyle } from "../../redux/slice/app"
import { X } from "react-feather"
import styles from "./styles.module.sass"
import { RootState, ComponentMember } from "../../types"

interface ItemProps {
    title: string
}

const ActiveStylesItem = (props: ItemProps) => {
    const dispatch = useDispatch()
    const handleRemove = () => {
        const key = props.title.split(":")[0]
        dispatch(removeStyle(key))
    }

    return (
        <div className={styles.item}>
            <div>
                <span>{props.title}</span>
                <X size={12} onClick={handleRemove} />
            </div>
        </div>
    )
}

const getStyles = (key: string, html: ComponentMember[]) => {
    const element = findNodeInTree(html, key)
    if (!element.props.style) return null
    else return element.props.style 
}

const ActiveStyles: React.FC = () => {

    const stylesList = useSelector((state: RootState) => {
        return getStyles(state.selectedKey, state.map )
    })

    let styleKeys = []
    if (stylesList) {
        styleKeys = Object.keys(stylesList)
    }

    return (
        <div className={styles.container}>
            <h2>Active styles</h2>
            <div>
                {styleKeys.length === 0 ? (
                    <span>You dont have any style at the moment</span>
                ) : (
                    styleKeys.map((key) => {
                        const name = cssToCamelCase(key)
                        const value = stylesList[key]
                        return (
                            <ActiveStylesItem
                                title={`${name}: ${value}`}
                                key={key}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ActiveStyles
