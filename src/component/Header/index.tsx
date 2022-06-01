import styles from "./styles.module.sass"
import { GitHub } from "react-feather"
import { Button } from "../Styled"

const url = "https://github.com/ariannargesi/quickcomponent"

const Header = () => {
    return (
        <header className={styles.header}>
            <a href={url}>
            <GitHub/>
            </a>
        </header>
    )
}

export default Header
