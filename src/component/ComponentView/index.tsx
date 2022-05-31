import { useSelector } from "react-redux"
import { RootState } from "../../types"
import arrayToComponent from "../../helper/arrayToComponent"
import styles from "./styles.module.sass"
import { Title } from '../Styled'
const ComponentView = () => {
    const { map, inputKey, selectedKey } = useSelector(
        (state: RootState) => state
    )
    const component = arrayToComponent(map, inputKey, selectedKey)

    return (
        <div className={styles.wrapper}>
            
            <div className={styles.header}>
                <Title.Large>Component view</Title.Large>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>{component}</div>
            </div>
        </div>
    )
}

export default ComponentView
