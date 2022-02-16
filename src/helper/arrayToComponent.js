import React from 'react'

const arrayToComponent = (html) => {
     return html.map((el, index) => {
        if(el.text) return el.text 
        console.log(el.props.style)
        return React.createElement(el.title,{style: el.props.style}, arrayToComponent(el.children))
    })
};

export default arrayToComponent