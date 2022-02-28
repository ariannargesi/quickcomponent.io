import { PickerTypes } from "../../helper/stylesPanel"

const {isKeyword, getPickerType} = require('../../helper/stylePanel')


it('should return the right value', () => {
    expect(isKeyword('flex')).toBe(true)
    expect(isKeyword('<string>')).toBe(false)
    expect(isKeyword("<'background-color'>")).toBe(false)
})

it('should return the right picker type', () => {
    expect(getPickerType("<'border-top-width'> || <'border-top-style'> || <color>")).toBe(PickerTypes.Input)
    expect(getPickerType("[ <length> | <percentage> ]{1,4}")).toBe(PickerTypes.Range)
    expect(getPickerType("<color>")).toBe(PickerTypes.Color)
    expect(getPickerType("static | relative | absolute | sticky | fixed")).toBe(PickerTypes.List)
    expect(getPickerType('<grid-line>')).toBe(PickerTypes.Input)
})