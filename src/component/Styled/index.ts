import styled, { css } from "styled-components"

export const baseTextColor = "#3e3e3e"
export const fontSizeBase = "12px"
export const fontFamily = "Open sans"
export const colorPrimary = "#1976d2"
export const baseMargin = "8px"
export const baseRadius = "2px"
export const baseHight = "30px"
export const bgDark = "#2a2a2a"

const BaseText = css`
    color: #3e3e3e;
    font-family: ${fontFamily};
    font-weight: 400;

    margin: 0;
`
export const scrollBarStyle = css`
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(131, 131, 131);
    }
`

// #6e6e6e
const Large = styled.h2`
    ${BaseText}
`
const Medium = styled.h3`
    ${BaseText}
`
const Small = styled.h4`
    ${BaseText}
`
export const Title = { Large, Medium, Small }

export const Button = styled.button`
    font-family: ${fontFamily};
    font-size: 16px;
    height: ${baseHight};
    border-radius: ${baseRadius};
    padding: 0px 20px;
    background: ${colorPrimary};
    cursor: pointer;
    margin: 8px 0;
    border: none;
    color: white;
    ${(props) => props.full && "width: 100%"};
    ${(props) => props.disabled && "background: lightgray"};
`
export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: ${baseHight};
    border-radius: ${baseRadius};
    font-size: ${fontSizeBase};
    padding: 0 10px;
    border: 1px solid #d9d9d9;
    color: #3e3e3e;
    margin: 8px 0;
    outline: none;
    &:focus {
        border: 1px solid #40a9ff;
    }
`
export const Range = styled.input`
    width: 100%;
`
export const Label = styled.label`
    ${BaseText}
`

export const Text = styled.span`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
  ${BaseText}
  ${(props) => {
      if (props.sucess) return "color: #83ff83;"
      else if (props.error) return "color: red;"
      if (props.white) return "color: white;"
      if (props.bold) return "font-weight: 700"
  }}
`
export const TitleWrapper = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    background: #eee;
    padding: 0 8px;
`

export const Content = styled.div`
  height: calc(100% - 42px);
  width: 100%
  border: 1px solid red;
  overflow: auto;
  ${scrollBarStyle}
`
