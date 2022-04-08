import { useSelector } from "react-redux"
import { RootState, ComponentMember } from "../types"
const useEmptyTree = () => {
    const map = useSelector((state: RootState) => state.app.map)
    return map.length === 0
}

export default useEmptyTree
