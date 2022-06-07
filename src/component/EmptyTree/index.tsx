import { Plus } from "react-feather"
import useToggleDrawer from "../../hooks/useToggleDrawer"
import styles from "./styles.module.sass"
import { Text } from '../Styled'

const EmptyTree = () => {
    const toggleDrawer = useToggleDrawer()
    return (
        <div className={styles.container}>
            <Text bold style={{display: 'block'}}>{`You don't have any element at the moment. Try adding a new one`}</Text>
            <Plus onClick={toggleDrawer} style={{marginTop: '8px'}} />
        </div>
    )
}

export default EmptyTree
