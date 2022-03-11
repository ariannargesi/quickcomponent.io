import React from 'react'

interface BoxProp {
    children: React.ReactNode,
    title: string 
}

const Box = (props: BoxProp) => {
    const style = {
        container: {
            padding: '15px 15px 10px 0',
        },
        title: {
            marginRight: '20px'
        }
    }
   return (
    <div style={style.container}>
        <h2 style={style.title}>{props.title}</h2>
        {props.children}
    </div>
   )
}

export default Box