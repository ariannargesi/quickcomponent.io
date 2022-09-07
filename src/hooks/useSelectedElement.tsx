import { useSelector } from "react-redux";
import { findNodeInTree } from "../helper";
import { RootState } from "../types";

export default () => {
    return useSelector((state: RootState) => {
        const res =  findNodeInTree(state.map, state.selectedKey)
        
        return res 
    })
}