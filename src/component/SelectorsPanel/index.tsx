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
import ImageSelector from "../Selectors/ImageSelector"
import styled from "styled-components"
import { scrollBarStyle } from "../Styled"
import useSelectedElement from "../../hooks/useSelectedElement"
import Accordion from "../UI/Accordion"

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
    const selectedElement = useSelectedElement()
    return (
        <Container>
            <UpdateClassname />
            {selectedElement.title === "img" && <ImageSelector />}

            <Accordion title="Sizing and spacing">
                <WidthAndHeight />
                <Padding />
                <Margin />
            </Accordion>
            <Accordion title="Color and Shadow">
                <Color />
                <BackgroundColor />
                <BoxShadow />
            </Accordion>
            <Accordion title="Font and Text">
                <TextAlign />
                <FontSize />
                <FontWeight />
            </Accordion>
            <Accordion title="Border">
                <BorderRadius />
                <Border />
            </Accordion>
            <Accordion title="Position and Display">
                <Positions />
                <Display />
            </Accordion>
        </Container>
    )
}

export default StylePannel
