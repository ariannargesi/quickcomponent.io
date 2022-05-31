import styles from "./styles.module.sass"
import { GitHub } from "react-feather"

const url = "https://github.com/ariannargesi/quickcomponent"
const issues = url + "/issues/new"

const Header = () => {
    return (
        <header className={styles.header}>
            <a href={issues}>Bug report</a>
        </header>
    )
}

export default Header
