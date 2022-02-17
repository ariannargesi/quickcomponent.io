import { useState, useEffect } from "react";
import React from 'react'
import "./styles.css";
import HtmlTree from './component/HtmlTree'
import ComponentView from './component/ComponentView'
import StyleList from './component/StyleList'
function App() {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");



    return (
        <div className="App">
            <h1> Component builder </h1>
            <div className='pure-g' >
                <div className="pure-u-1-4">
                    <div style={{width: '800px'}}>
                        <StyleList/>
                    </div>
                    
                </div>
                <div className="pure-u-1-3">
                    <HtmlTree />
                </div>
                <div className="pure-u-1-3">
                    <ComponentView />
                </div>
                
            </div>



        </div>
    )
}

export default App;
