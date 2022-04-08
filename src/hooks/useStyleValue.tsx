import { useSelector } from "react-redux"
import { RootState } from "../types"
import { findNodeInTree } from "../helper"

const useStyleValue = (name: string): string | undefined => {
    const { map, selectedKey } = useSelector((state: RootState) => state.app)
    let value
    findNodeInTree(map, selectedKey, (res) => {
        value = res
    })
    const styles = value.props?.style
    if (styles) return styles[name]
    else undefined
}

export default useStyleValue
