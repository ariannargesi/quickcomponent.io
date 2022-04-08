import { Link } from "react-router-dom"
import Header from "./component/Header"
import HtmlTree from "./component/HtmlTree"
import ActiveStyles from "./component/ActiveStyles"
import ComponentView from "./component/ComponentView"
import StylePanel from "./component/StylePanel"
import Drawer from "./component/Drawer"
import useEmptyTree from "./hooks/useEmptyTree"
import EmptyTree from "./component/EmptyTree"
function App() {
    const treeIsEmpty = useEmptyTree()

    return (
        <div className="App">
            <Header />
            {treeIsEmpty ? (
                <EmptyTree />
            ) : (
                <div className="main-container">
                    <StylePanel />
                    <div style={{ width: "300px" }}>
                        <HtmlTree />
                        <ActiveStyles />
                    </div>
                    <ComponentView />
                </div>
            )}
            <Drawer />

            <Link to="/export">
                <button
                    style={{
                        position: "fixed",
                        right: "50px",
                        bottom: "50px",
                        background: "purple",
                        borderRadius: "15px",
                        color: "white",
                        padding: "16px 32px",
                        border: "none",
                        fontSize: "18px",
                    }}
                >
                    {" "}
                    Export
                </button>
            </Link>
        </div>
    )
}

export default App
