import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {applyStyle} from '../../redux/slice'
import { cssToCamelCase, objectToStyle, generateStyles, isPureCssValue, getCssValues } from '../../helper'
import Item from '../CssProperty'

const StylePannel = () => {
    const dispatch = useDispatch()
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");
    const [state, setState] = useState()

    return (
        <div className="pure-u-1-3">
            <div style={{ height: "100vh", overflow: "scroll" }}>
                {" "}
                {Object.keys(require("../../data/css-properties.json")).map(
                    (key, index) => {
                        const value = Object.values(
                            require("../../data/css-properties.json")
                        )[index];
                        const syntax = value.syntax;
                        const avalibleItems = syntax.split("|");

                        const rangeValues = [];
                        const staticValues = [];

                        avalibleItems.map((item) => {
                            item = item.trim()
                            if (item === '<length>' || item === '<percentage>') rangeValues.push(item);
                            else staticValues.push(item);
                        });
                        return (
                            <Item
                                label={key}
                                key={key}
                                ranges={rangeValues}
                                statics={staticValues}
                                onChange={(value) => {
                                dispatch(applyStyle({
                                    key: cssToCamelCase(key),
                                    value
                                }))
                                }}
                            />
                        );
                    }
                )}{" "}
            </div>
        </div>

    )
}

export default StylePannel 