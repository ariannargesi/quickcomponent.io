const arrayToJSX = (html) => {
    return html
        .map((el) => {
            if (el.text) return el.text
            const className =
                el.props.className && el.props.style
                    ? `className='${el.props.className}'`
                    : ""
            return `<${el.title} ${className}>${arrayToJSX(el.children)}</${
                el.title
            }>`
        })
        .join("")
}

export default arrayToJSX
