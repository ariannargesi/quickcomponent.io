import {createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import app from './slice/app'

const store = createStore(combineReducers({
     app,
}), composeWithDevTools())

export default store
