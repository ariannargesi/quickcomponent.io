import React, { MouseEventHandler } from 'react'
import styles from './styles.module.sass'


interface ItemProps {
    title: string, 
    onClick: MouseEventHandler<HTMLElement> 
}

const Item = (props: ItemProps ) => {
    return (
        <span className={styles.item} onClick={props.onClick}>{props.title}</span>
    )
}

const QuickStyle: React.FC = () => {
    return (
        <div className='html-tree'>
            <h2>Active styles</h2>            
            <Item
                title='border-radius: 20px'
                onClick={() => {

                }}
            />
            <Item
                title='display: flex'
                onClick={() => {

                }}
            />
            <Item
                title='justify-content: space-between'
                onClick={() => {

                }}
            />
        </div>
    )
}

export default QuickStyle