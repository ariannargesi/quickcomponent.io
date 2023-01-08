import { useSelector } from "react-redux"
import { RootState } from "../../types"
import Header from "../Header"
import ComponentView from "../ComponentView"
import SelectorsPanel from "../SelectorsPanel"
import Drawer from "../Drawer"
import EmptyTree from "../EmptyTree"
import TreeAndStyles from "../Sider/TreeAndStyles"

function MainEditor() {
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

export default MainEditor
