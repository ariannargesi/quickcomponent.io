import React from 'react'
import styles from './styles.module.sass'
interface Props {
    options: string[],
    onChange: (value: string) => void,
    activeItem?: string | number,
    type?: string,
}

const Radio = (props: Props) => {
    return (
        <ul className={props.type === 'gray' ? styles.big : styles.small}>
            {
                props.options && props.options.map((item) =>
                    <li
                        className={item === props.activeItem ? styles.active : null}
                        onClick={() => props.onChange(item)}
                    >
                        {item}
                    </li>)
            }
        </ul>
    )
}

export default Radio 
