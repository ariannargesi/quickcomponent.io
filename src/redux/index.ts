import {createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import app, { App } from './slice'
export interface RootState {
    app: App   
}

const store = createStore(combineReducers({
     app,
}), composeWithDevTools())

export default store
