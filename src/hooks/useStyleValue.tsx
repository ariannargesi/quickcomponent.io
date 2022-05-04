import { useSelector } from "react-redux"
import { RootState } from "../types"
import { findNodeInTree } from "../helper"

const useStyleValue = (name: string): string | undefined => {
    const styleValue = useSelector((state: RootState) => {
        const res = findNodeInTree(state.app.map , state.app.selectedKey)
        if(res.props.style)
            return res.props.style[name]
    })
    return styleValue 
}

export default useStyleValue
