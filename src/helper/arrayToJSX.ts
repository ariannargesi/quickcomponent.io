const arrayToComponent = (html):string => {
    return html.map((el, index) => {
       if(el.text) return el.text     
       return `<${el.title}>${arrayToComponent(el.children)}</${el.title}>`
   })
};

const removeExtraCommas = (str: string): string => {
    const componentString = arrayToComponent(str)[0]
    return componentString.replace(/>,</g, '><')
}
export default removeExtraCommas