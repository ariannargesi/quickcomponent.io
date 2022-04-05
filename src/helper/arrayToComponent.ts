import React from 'react'

const arrayToComponent = (html): React.ReactNode  => {
     return html.map((el) => {
        if(typeof el.text === 'string') return el.text        
        return React.createElement(el.title,{style: el.props.style, key:  el.key}, arrayToComponent(el.children))
    })
};

export default arrayToComponent