/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import {useState} from "react";
import {getCssValues} from "../../helper";
import Slider from "@mui/material/Slider";
import React from 'react'

const CssProperties = (props) => {
    const [showContent, setShowContent] = useState(false);
    const toggleContent = () => setShowContent(!showContent);
    const { label, ranges, statics, onChange } = props;
    const values = getCssValues(label)
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
 
export default CssProperties 