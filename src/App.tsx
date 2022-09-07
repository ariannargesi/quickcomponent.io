import { useSelector } from "react-redux"
import { RootState } from "./types"
import Header from "./component/Header"
import ComponentView from "./component/ComponentView"
import SelectorsPanel from "./component/SelectorsPanel"
import Drawer from "./component/Drawer"
import EmptyTree from "./component/EmptyTree"
import TreeAndStyles from "./component/Sider/TreeAndStyles"

function App() {
    const treeIsEmpty = useSelector((state: RootState) => state.emptyTree)

    if (treeIsEmpty)
        return (
            <div className="App">
                <Header />
                <EmptyTree />
                <Drawer />
            </div>
        )

    return (
        <div className="App">
            <Header />
            <div className="main-container">
                <SelectorsPanel />
                <TreeAndStyles />
                <ComponentView />
            </div>
            <Drawer />
        </div>
    )
}

export default App
