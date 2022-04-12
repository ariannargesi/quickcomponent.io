import ReactDOM from "react-dom"
import "./styles.css"
import App from "./App"
import store from "./redux"
import "antd/dist/antd.min.css"
import { Provider } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"
import Export from "./component/Export"
import { useMediaQuery } from "react-responsive"
const root = document.getElementById("root")

const Main = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    })

    if (!isDesktopOrLaptop)
        return (
            <div
                style={{
                    padding: "32px",
                }}
            >
                <h2>Please visit this website with your desktop or laptop.</h2>
                <h3>Come back. It's worth it 😉</h3>
            </div>
        )
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/export" element={<Export />} />
                </Routes>
            </HashRouter>
        </Provider>
    )
}

ReactDOM.render(<Main />, root)
