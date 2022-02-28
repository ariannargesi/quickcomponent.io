import React from 'react'

interface Props {
    color: string,
    onClick: any
}

const ColorBox = (props: Props) => {

    const style = {

    }

    return (
        <div style={{ width: "100%", textAlign: 'right' }}>
            <div style={{
                backgroundColor: props.color,
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                cursor: 'pointer',
                float: 'right',
            }} onClick={props.onClick} />
        </div>
    )
}

export default ColorBox 