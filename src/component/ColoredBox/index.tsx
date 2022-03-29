import React from 'react'
import styles from './styles.module.sass'

interface Props {
    color: string,
    onClick: any
}

const ColorBox = (props: Props) => {


    return (
        <div className={styles.container}>
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