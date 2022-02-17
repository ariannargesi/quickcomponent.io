import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {applyStyle} from '../../redux/slice'
import { cssToCamelCase, objectToStyle, generateStyles, isPureCssValue, getCssValues } from '../../helper'
import Item from '../CssProperty'
import propTypes from 'prop-types'

const fx = Object.values(require("../../data/css-properties.json"))
    
const StylePannel = ({searchQuery}) => {

    console.log('This component geting render')

    const dispatch = useDispatch()
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const [code, setCode] = useState("");
    const [state, setState] = useState()

    return (
        <div className="pure-u-1-3">
            <div style={{ height: "100vh", overflow: "scroll" }}>
                {" "}
                {Object.keys(require("../../data/css-properties.json"))
                .filter(item => {
                    if(searchQuery)
                        return item.indexOf(searchQuery) != -1
                    return true 
                })
                .map(
                    (key, index) => {
                        const value = fx[index]
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

StylePannel.propTypes = {
    searchQuery: propTypes.string 
}


export default StylePannel 