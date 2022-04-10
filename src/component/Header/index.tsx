import styles from "./styles.module.sass"
import { GitHub } from "react-feather"

const url = "https://github.com/ariannargesi/quickcomponent"
const issues = url + "/issues/new"
const tweet = `https://twitter.com/intent/tweet?text=
I found this app. Its really great and you should try it`.replace(" ", "%20")

const Header = () => {
    return (
        <header className={styles.header}>
            <a href={issues}>Report bug</a>
            <a href={tweet}>Tweet about it</a>
            <div className={styles.github}>
                <a href={url}>
                    <GitHub color="white" size={40} />
                </a>
            </div>
        </header>
    )
}

export default Header
