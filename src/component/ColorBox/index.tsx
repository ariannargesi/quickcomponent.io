import styles from "./styles.module.sass"
interface Props {
    color: string
    onClick: any
}

const ColorBox = (props: Props) => {
    const { color, onClick } = props
    return (
        <div className={styles.container} onClick={onClick}>
            <div style={{ backgroundColor: color }} />
        </div>
    )
}

export default ColorBox
