const arrayToJSx = (html) => {
    return html.map((el, index) => {
       if(el.text) return el.text     
       return `<${el.title} ${el.props?.className ? `className='${el.props.className}'` : ''}>${arrayToJSx(el.children)}</${el.title}>`
   })
};

export default arrayToJSx