import { useSelector } from "react-redux"
import { RootState } from "../../types"
import arrayToComponent from "../../helper/arrayToComponent"
import styles from "./styles.module.sass"
import { Title, Button, TitleWrapper } from "../Styled"
import { Link } from "react-router-dom"

const ComponentView = () => {
    const { map, inputKey, selectedKey } = useSelector(
        (state: RootState) => state
    )
    const component = arrayToComponent(map, inputKey, selectedKey)

    return (
        <div className={styles.wrapper}>
            <TitleWrapper
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Title.Small>Component view</Title.Small>
                <Link to="/export" style={{textDecoration: 'none'}}>
                    <Button>{"<Export/>"}</Button>
                </Link>
            </TitleWrapper>
            <div className={styles.container}>
                <div className={styles.content}>{component}</div>
            </div>
        </div>
    )
}

export default ComponentView
