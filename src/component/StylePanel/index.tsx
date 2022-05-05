import { useSelector } from "react-redux"
import WidthAndHeight from "../Selectors/WidthAndHeight"
import BoxShadow from "../Selectors/BoxShadow"
import Positions from "../Selectors/Positions"
import Display from "../Selectors/Display"
import BorderRadius from "../Selectors/BorderRadius"
import TextAlign from "../Selectors/TextAlign"
import Border from "../Selectors/Border"
import FontSize from "../Selectors/FontSize"
import FontWeight from "../Selectors/FontWeight"
import Color from "../Selectors/Color"
import BackgroundColor from "../Selectors/Background"
import Margin from "../Selectors/Margin"
import Padding from "../Selectors/Padding"
import UpdateClassname from '../Selectors/UpdateClassname'
import { findNodeInTree } from "../../helper"
import { RootState, ComponentMember } from "../../types"

import styles from "./styles.module.sass"

const StylePannel = () => {

    const key = useSelector((state: RootState) => state.app.selectedKey)


    return (
        <div className={styles.container}>
                <>
                    <UpdateClassname/>
                    <WidthAndHeight />
                    <Margin />
                    <Padding />
                    <Color />
                    <BackgroundColor />  
                    <BoxShadow />
                    <Positions />                    
                    <Display />
                    <BorderRadius />
                    <Border />
                    <TextAlign />
                    <FontSize />
                    <FontWeight /> 
                </>
        </div>
    )
}

export default StylePannel
