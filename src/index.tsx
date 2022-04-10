import ReactDOM from "react-dom"
import "./styles.css"
import App from "./App"
import store from "./redux"
import "antd/dist/antd.css"
import { Provider } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"
import Export from "./component/Export"
const root = document.getElementById("root")

const Main = () => {
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
