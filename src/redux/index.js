import {createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import html from './slice'
import Export from './slice/Export'
import ui from './ui'
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
     reducer,
     html,
     export: Export,
     ui
}), composeWithDevTools())

export default store
