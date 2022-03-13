import { useState, useEffect } from "react";
import React from 'react'
import "./styles.css";
import Header from './component/Header'
import HtmlTree from './component/HtmlTree'
import QuickStyle from './component/QuickStyle'
import ComponentView from './component/ComponentView'
import StyleList from './component/StyleList'
import Temp from './component/Temp'
function App() {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");



    return (
        <div className="App">
            <div className='pure-g' >
            <div className="pure-u-1-4">
            <div className="pure-u-1-4">
                    <div style={{width: '350px'}}>
                        <StyleList/>
                    </div>
                    
                </div>
                    <div style={{width: '800px'}}>
                    {/* <Temp/> */}
                    </div>
                </div>
                
                <div className="pure-u-1-3">
                    <HtmlTree />
                    <QuickStyle />
                </div>
                <div className="pure-u-1-3">
                    <ComponentView />
                </div>
            </div>



        </div>
    )
}

export default App;
