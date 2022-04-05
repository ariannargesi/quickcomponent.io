import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Header from './component/Header'
import HtmlTree from './component/HtmlTree'
import ActiveStyles from './component/ActiveStyles'
import ComponentView from './component/ComponentView'
import StyleList from './component/StylePannel'
import Drawer from './component/Drawer'
import useEmptyTree from "./hooks/useEmptyTree"
import EmptyTree from "./component/EmptyTree"
import welcomeComponentMap from './welcome-map'
import {initiateMap} from './redux/slice/app'
function App() {
   

    const treeIsEmpty = useEmptyTree()
    return (
        <div className="App">
            <Header />
            {treeIsEmpty ? <EmptyTree /> : <div className="main-container">
                <StyleList />
                <div style={{ width: '300px' }}>
                    <HtmlTree />
                   <ActiveStyles/>
                </div>
                <ComponentView />
                </div>}
            <Drawer />

            <Link to='/export'>
                <button style={{
                    position: ' absolute',
                    right: '50px',
                    bottom: '50px',
                    background: 'purple',
                    borderRadius: "15px",
                    color: 'white',
                    padding: '16px 32px',
                    border: 'none',
                    fontSize: "18px"
                }}> Export</button>
            </Link>


        </div>
    )
}

export default App;
