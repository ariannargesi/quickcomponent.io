import React from 'react'
import styles from './styles.module.sass'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link  to="/">View</Link>
            <Link  to="/export">Export</Link>
        </header>
    )
}

export default Header 


