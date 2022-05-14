import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Output from "../Output"
import CodeConfig from "../CodeConfig"
import { generateCode } from "../../redux/slice/app"
const style = {
    container: {
        width: "1200px",
        margin: "0 auto",
    },
    flex: {
        display: "flex",
       
    },
}

const Export = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(generateCode())
    }, [])

    return (
        <div style={style.container}>
            <div style={style.flex}>
                <div style={{ width: "50vw", height: "100vh" }}>
                    <CodeConfig />
                </div>
                <div style={{ width: "50vw", height: "100vh" }}>
                    <Output />
                </div>
            </div>
        </div>
    )
}

export default Export
