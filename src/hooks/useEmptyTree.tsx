import { useSelector } from "react-redux"
import { RootState } from "../types"

const useEmptyTree = () => {
    return useSelector((state: RootState) => state.app.emptyTree)
    
}

export default useEmptyTree
