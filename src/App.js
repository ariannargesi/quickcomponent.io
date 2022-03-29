import { useState, useEffect } from "react";
import React from 'react'
import Header from './component/Header'
import HtmlTree from './component/HtmlTree'
import QuickStyle from './component/QuickStyle'
import ComponentView from './component/ComponentView'
import StyleList from './component/StyleList'
import Drawer from './component/HtmlTree/Drawer'
import useEmptyTree from "./hooks/useEmptyTree"
import EmptyTree from "./component/EmptyTree"
import { Link } from 'react-router-dom'
import { Empty } from "antd";
function App() {
    const treeIsEmpty = useEmptyTree()
    return (
        <div className="App">
            <Header />

            {treeIsEmpty ?
                <EmptyTree />
                :
                <>
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

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%' }}>
                            <StyleList />
                        </div>
                        <div style={{ width: '25%' }}>
                            {/* <HtmlTree /> */}
                            {/* <QuickStyle /> */}
                        </div>
                        <div style={{ width: '50%' }}>
                            <ComponentView />
                        </div>
                    </div>
                </>
            }
            <Drawer />

        </div>
    )
}

export default App;
