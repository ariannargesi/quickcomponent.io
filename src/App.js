/* eslint-disable */
import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import "./styles.css";

import Slider from "@mui/material/Slider";
import {useThemeProps} from "@mui/material";



function cssToCamelCase(string) {
    /*
     * input: "border-radius"
     * output: borderRadius
     * */
    let charsArray = string.split("");

    string.split("").map((character, index) => {
        if (character === "-" && index != 0) {
            charsArray[index + 1] = charsArray[index + 1].toUpperCase();
        }
    });

    let resultString = charsArray
        .filter((character) => character != "-")
        .join("");
    return resultString;
}
function objectToStyle(object, semi) {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object);
    const values = Object.values(object);
    let main = "";
    keys.map((key, index) => {
        let currentLine = "";
        key.split("").map((char) => {
            if (char === char.toUpperCase()) currentLine += "-" + char.toLowerCase();
            else currentLine += char;
        });
        currentLine += ": ";
        currentLine += values[index];
        if (semi) currentLine += ";";
        currentLine += "\n";
        main += currentLine;
    });
    return main;
}
function generateStyles() {
    let cssProperties = require("./data/css-properties.json");
    const allKeys = Object.keys(cssProperties);
    const styles = {};
    allKeys.map((key) => {
        styles[cssToCamelCase(key)] = cssProperties[key].initial;
    });
    return styles;
}
function isPureCssValue(value){
    return !(value.indexOf('<') >=0) 
}
function getCssValues(propertyName){
    const cssProperties = require('./data/css-properties.json')
    const unFilteredValues = cssProperties[propertyName].syntax 
    const unFilteredValuesArray = unFilteredValues.split('|')
    const filteredValues = []
    const temp = []
    unFilteredValuesArray.map(rawValue => {
        rawValue = rawValue.trim()
        if(isPureCssValue(rawValue))
            filteredValues.push(rawValue)
        // else temp.push(rawValue)
    })
    // alert(temp)
    return filteredValues
}

getCssValues('width')


const Item = (props) => {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const { label, ranges, statics, onChange } = props;
    const values = getCssValues(label)    
    const finalValue = []
    
    
    return (
        <div
            className={"item"}
            onMouseEnter={toggleContent}
            onMouseLeave={toggleContent}
        >
            <label htmlFor=""> {label} </label>
            {showContent && (
                <div>
                    {ranges.length != 0 && (
                        <Slider
                            size={"small"}
                            defaultValue={0}
                            max={500}
                            aria-label={"Small"}
                            valueLabelDisplay={"auto"}
                            onChange={(event, newValue) => onChange(newValue + "px")}
                        />
                    )}
                    <ul>
                    {values.map(item => {
                        return (
                            <li>{item}</li>
                        )
                    })}
                    </ul>
                </div>
            )}{" "}
        </div>
    );
};

function App() {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");
    const [state, setState] = useState({
        border: '2px solid red',
        width: '50px',
        height: '50px',
    });

    const doShit = () =>
        setState((prev) => {
            width: "500px";
        });

    useEffect(() => {
        // setState(generateStyles());
    }, []);

    return (
        <div className="App">
            <h1> Component builder </h1>
            <div className="pure-g">
                <div className="pure-u-1-3">
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
                <div
                    className="pure-u-2-3"
                    style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        height: "500px",
                    }}
                >
                    <div style={{ margin: "0 auto" }}>
                        <div style={state} />
                    </div>
                </div>
            </div>
            {/*<button onClick={() => setCode(objectToStyle(state, true))}>Get css*/}
            {/*</button>*/}
            {/*<button onClick={() => setCode(objectToStyle(state, false))}>Get sass</button>*/}
            <ReactTooltip />
            <div>
        <textarea value={code} style={{ height: "400px" }}>
        </textarea>
            </div>
        </div>
    );
}

export default App;
