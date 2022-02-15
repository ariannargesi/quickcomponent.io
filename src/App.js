import { useState, useEffect } from "react";
import React from 'react'
import ReactTooltip from "react-tooltip";
import "./styles.css";
import {cssToCamelCase, objectToStyle, generateStyles, isPureCssValue, getCssValues} from './helper'
import HtmlTree from './component/HtmlTree'
import Item from './component/CssProperty'
import ComponentView from './component/ComponentView'
function App() {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");
    


    return (
        <div className="App">
            <h1> Component builder </h1>
            <div className="pure-g">
                {/* <div className="pure-u-1-3">
                    <div style={{ height: "100vh", overflow: "scroll" }}>
                        {" "}
                        {Object.keys(require("./data/css-properties.json")).map(
                            (key, index) => {
                                const value = Object.values(
                                    require("./data/css-properties.json")
                                )[index];
                                const syntax = value.syntax;
                                const avalibleItems = syntax.split("|");

                                const rangeValues = [];
                                const staticValues = [];

                                avalibleItems.map((item) => {
                                    item = item.trim()
                                    if(item === '<length>' || item === '<percentage>') rangeValues.push(item);
                                    else staticValues.push(item);
                                });
                                return (
                                    <Item
                                        label={key}
                                        key={key}
                                        ranges={rangeValues}
                                        statics={staticValues}
                                        onChange={(value) => {
                                            setState(prev => {
                                                return {
                                                    ...prev,
                                                    [cssToCamelCase(key)]: value
                                                }
                                            })                                            
                                        }}
                                    />
                                );
                            }
                        )}{" "}
                    </div>
                </div>
                */}
                <div className="pure-u-1-3"
                    style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        height: "500px",
                    }}
                >
                    <div style={{ margin: "0 auto" }}>
                        <ComponentView/>
                    </div>
                </div> 
                <div className="pure-u-1-3">
                    <HtmlTree/>
                </div>
            </div>
            {/*<button onClick={() => setCode(objectToStyle(state, true))}>Get css*/}
            {/*</button>*/}
            {/*<button onClick={() => setCode(objectToStyle(state, false))}>Get sass</button>*/}
            {/* <ReactTooltip /> */}
            <div>
        {/* <textarea value={code} style={{ height: "400px" }}>
        </textarea> */}
            </div>
        </div>
    );
}

export default App;
