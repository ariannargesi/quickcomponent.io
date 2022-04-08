import React from 'react'
import { Plus } from 'react-feather'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import styles from './styles.module.sass'

let imNot = 'Check for this'

const EmptyTree = () => {
    const toggleDrawer = useToggleDrawer()
    return (
        <div className={styles.container}>
            <h3>{`You don't have any element at the moment. Try adding a new one`}</h3>
            <Plus onClick={toggleDrawer} />
        </div>
    )
}

export default EmptyTree