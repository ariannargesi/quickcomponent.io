import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { ChevronRight } from 'react-feather'
import { RootState } from "./types"
import Header from "./component/Header"
import ComponentView from "./component/ComponentView"
import StylePanel from "./component/StylePanel"
import Drawer from "./component/Drawer"
import EmptyTree from "./component/EmptyTree"
import TreeAndStyles from './component/Sider/TreeAndStyles'
function App() {
    
    const treeIsEmpty = useSelector((state: RootState) => state.app.emptyTree)

    if(treeIsEmpty)
        return (
            <div className="App">
                 <Header />  
                 <EmptyTree/> 
                 <Drawer/>
            </div>
        )

    return (
        <div className="App">
            <Header />
                <div className="main-container">
                    <StylePanel />  
                    <TreeAndStyles/>                    
                    <ComponentView />
                </div>
            )
            <Drawer />
            <Link to="/export">
                <button className='export-button'>                   
                    View code
                    <ChevronRight/>
                </button>
            </Link>
        </div>
    )
}

export default App
