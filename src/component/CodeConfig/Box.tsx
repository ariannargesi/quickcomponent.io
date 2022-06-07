import { Title } from '../Styled'
interface Props {
    children: React.ReactNode
    title: string
}

const Box = (props: Props) => {
    const style = {
        container: {
            padding: "15px 15px 10px 0",
        },
        title: {
            marginRight: "20px",
        },
    }
    return (
        <div style={style.container}>
            <Title.Large>{props.title}</Title.Large>
            {props.children}
        </div>
    )
}

export default Box
