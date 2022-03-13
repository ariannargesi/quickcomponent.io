import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyStyle, updateSearchQuery } from '../../redux/slice'
import { cssToCamelCase, objectToStyle, generateStyles, isPureCssValue, getCssValues } from '../../helper'
import Item from '../CssProperty'
import cssGroups from '../../data/css-groups'
import properties from '../../data/css-properties.json'
import styles from './styles.module.css'
const cssKeys = Object.keys(properties)

import Group from '../CssGroups'
const list = []
for (let x = 0; x < cssGroups.length; x++) {
    const temp = []
    cssKeys.forEach(item => {
        properties[item].name = item
        if (properties[item].groups[0] === cssGroups[x])
            temp.push(properties[item])

    })
    list.push(temp)
}


const StylePannel = () => {
    const dispatch = useDispatch()
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    // @ts-ignore
    const {query, exact } = useSelector(state => state.html.searchQuery)

    // return (
    //     <div className="pure-u-1-3">
    //         <div style={{ height: "100vh", overflow: "scroll" }}>
    //             {" "}
    //             {Object.keys(require("../../data/css-properties.json")).map(
    //                 (key, index) => {
    //                     const value = Object.values(
    //                         require("../../data/css-properties.json")
    //                     )[index];
    //                     const syntax = value.syntax;
    //                     const avalibleItems = syntax.split("|"); 
    //                     const rangeValues = [];
    //                     const staticValues = [];

    //                     avalibleItems.map((item) => {
    //                         item = item.trim()
    //                         if (item === '<length>' || item === '<percentage>') rangeValues.push(item);
    //                         else staticValues.push(item);
    //                     });
    //                     return (
    //                         <Item
    //                             label={key}
    //                             key={key}
    //                             // ranges={rangeValues}
    //                             // statics={staticValues}

    //                         />
    //                     );
    //                 }
    //             )}
    //         </div>
    //     </div>

    // )
    return (
        <div className={styles.container}>
            <input
                placeholder='Search'
                value={query}
                onChange={e => dispatch(updateSearchQuery({value: e.target.value, exact: false}))}
            />
            {query && 
                cssKeys.filter(key => key.indexOf(query) > -1).map(item => {
                    item = properties[item]
                    return (
                        <Item
                            name={item.name}
                            syntax={item.syntax}
                            onChange={(value) => {
                                dispatch(applyStyle({
                                    key: cssToCamelCase(item.name),
                                    value
                                }))
                            }}
                        />

                    )
                }
            )}

            {!query && list.map((subList, index) => (
                <Group label={cssGroups[index]}>
                    {subList.map(item => {
                        return (
                            <Item
                                name={item.name}
                                syntax={item.syntax}
                                onChange={(value) => {
                                    dispatch(applyStyle({
                                        key: cssToCamelCase(item.name),
                                        value
                                    }))
                                }}
                            />

                        )
                    })}
                </Group>
            ))}</div>
    )
}

export default StylePannel 