import { useState } from 'react'
import { Link } from "react-router-dom"
import { Layout } from 'antd'
import { ChevronRight } from 'react-feather'
import styles from './App.module.sass'
import Header from "./component/Header"
import HtmlTree from "./component/HtmlTree"
import ActiveStyles from "./component/ActiveStyles"
import ComponentView from "./component/ComponentView"
import StylePanel from "./component/StylePanel"
import Drawer from "./component/Drawer"
import useEmptyTree from "./hooks/useEmptyTree"
import EmptyTree from "./component/EmptyTree"

const { Sider } = Layout

function App() {
    
    const [htmlTreeAndActiveStylesVisible, toggleHtmlTreeAndActiveStyles] = useState(true)
    const treeIsEmpty = useEmptyTree()

    

    return (
        <div className="App">
            <Header />
            {treeIsEmpty ? (
                <EmptyTree />
            ) : (
                <div className="main-container">
                    <StylePanel /> 
                    <Sider
                        trigger={null}
                        style={{ position: 'relative', backgroundColor: '#eee' }}
                        collapsible width={htmlTreeAndActiveStylesVisible ? 300 : 0}
                    >
                        {htmlTreeAndActiveStylesVisible &&
                            <div style={{height: '100%', position: 'relative', zIndex: 1, }}>
                                <HtmlTree /> 
                                <ActiveStyles />
                            </div>
                        }
                        <div
                            className={styles.siderControl}
                            onClick={() => {
                                toggleHtmlTreeAndActiveStyles(!htmlTreeAndActiveStylesVisible)
                            }}>
                            <ChevronRight />
                        </div>
                    </Sider> 
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
                    
                    Export
                </button>
            </Link>
        </div>
    )
}

export default App
