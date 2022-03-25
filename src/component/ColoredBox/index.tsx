import React from 'react'

interface Props {
    color: string,
    onClick: any
}

const ColorBox = (props: Props) => {

    const style = {

    }

    return (
        <div>
            <div style={{
                backgroundColor: props.color,
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                cursor: 'pointer',
            }} onClick={props.onClick} />
        </div>
    )
}

export default ColorBox 