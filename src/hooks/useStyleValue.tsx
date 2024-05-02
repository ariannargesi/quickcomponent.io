import { useSelector } from "react-redux"
import { RootState } from "../types"
import { findNodeInTree, getParentNode, isTextNode } from "../helper"

const useStyleValue = (name: string): string => {
    const styleValue = useSelector((state: RootState) => {
        let res = findNodeInTree(state.map, state.selectedKey)
        if (isTextNode(res)) res = getParentNode(state.map, state.selectedKey)
        if (res.props.style) return res.props.style[name]
    })
    return styleValue
}

export default useStyleValue
