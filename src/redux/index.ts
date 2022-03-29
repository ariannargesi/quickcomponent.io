import {createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import app, { App } from './slice'
import Export from './slice/Export'
import ui from './ui'

export interface RootState {
    app: App   
}

const reducer = (state = {tables: [], aceLiveActive: null}, action) => {
    const newState = {...state}
    switch (action.type){
        case 'UPDATE_ACE_LIVE_INFO':
            newState.aceLiveActive = action.payload
            break
        case 'UPDATE_TABLES_LIST':
            newState.tables = action.payload
            break
    }
    return newState
}

const store = createStore(combineReducers({
     app,
}), composeWithDevTools())

export default store
