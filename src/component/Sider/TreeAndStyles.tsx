import { useState } from 'react'
import {Layout} from 'antd'
import { ChevronRight } from 'react-feather'
import HtmlTree from '../HtmlTree'
import ActiveStyles from '../ActiveStyles'

import styles from './styles.module.sass'

const { Sider } = Layout


const TreeAndStyles = () => {

    const [visible, setVisible] = useState(true)

    return (
        <Sider
            trigger={null}
            style={{ position: 'relative', backgroundColor: '#eee' }}
            collapsible width={visible ? 300 : 0}
        >
            {visible &&
                <div style={{height: "100%"}}>
                    <HtmlTree />
                    {/* <ActiveStyles /> */}
                </div>
            }
            <div
                className={styles.siderControl}
                onClick={() => {
                    setVisible(!visible)
                }}>
                <ChevronRight />
            </div>
        </Sider>
    )
}

export default TreeAndStyles