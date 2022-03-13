import React from 'react'

const arrayToComponent = (html) => {
     return html.map((el, index) => {
        if(typeof el.text === 'string') return el.text        
        return React.createElement(el.title,{style: el.props.style}, arrayToComponent(el.children))
    })
};

export default arrayToComponent