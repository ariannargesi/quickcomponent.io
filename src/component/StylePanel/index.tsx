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
import UpdateClassname from "../Selectors/UpdateClassname"
import styled from "styled-components"
import { scrollBarStyle } from "../Styled"

const Container = styled.div`
    width: 300px;
    min-width: 300px;
    padding: 5px;
    overflow: auto;
    background: white;
    border-right: 1px solid lightgray;
    box-sizing: border-box;
    ${scrollBarStyle}
`
const StylePannel = () => {
    return (
        <Container>
            <UpdateClassname />
            <WidthAndHeight />
            <Margin />
            <Padding />
            <Color />
            <BackgroundColor />
            <TextAlign />
            <BoxShadow />
            <Positions />
            <Display />
            <BorderRadius />
            <Border />
            <FontSize />
            <FontWeight />
        </Container>
    )
}

export default StylePannel
