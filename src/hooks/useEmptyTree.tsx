import { useSelector } from "react-redux"
import { ComponentObject } from "../redux/slice"
import { RootState } from '../redux'
const useEmptyTree = () => {
   const map = useSelector((state: RootState) => state.app.map)
    return map.length === 0
}

export default useEmptyTree 