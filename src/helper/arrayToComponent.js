import React from 'react'

const arrayToComponent = (html) => {
     return html.map((el, index) => {
        if(el.text) return el.text 
        return React.createElement(el.title, {key: index}, arrayToComponent(el.children))
    })
};

export default arrayToComponent