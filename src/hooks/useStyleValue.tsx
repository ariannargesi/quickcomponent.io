import { useSelector } from "react-redux"
import { RootState } from "../types"
import { findNodeInTree } from "../helper"

const useStyleValue = (name: string): string | null => {
    const styleValue = useSelector((state: RootState) => {
        const res = findNodeInTree(state.map, state.selectedKey)
        if (res.props.style) return res.props.style[name]
    })
    return styleValue
}

export default useStyleValue
