import React from 'react'
import styles from './styles.module.sass'
import {GitHub} from 'react-feather'


const url = 'https://github.com/airannargesi/quickcomponent.io'

const Footer = ()=> {
    return (
        <footer className={styles.footer}>
            <div></div>
            <div className={'align-center'}>
                <a href={url} target='_black'>
                    <GitHub color='black'/>
                </a>
            </div>
        </footer>
    )
}

export default Footer 