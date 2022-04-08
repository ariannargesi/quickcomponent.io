import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import "./styles.css";  
import App from './App'
import store from './redux'
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'
import { HashRouter, Route, Routes } from "react-router-dom";
import Export from './component/Export'
import { initiateMap } from './redux/slice/app'
import welcomeComponentMap from './welcome-map'
const root = document.getElementById('root')

const InitiateMapComponent = () => {
 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initiateMap({map: welcomeComponentMap}))
  }, [])
  return null 
}

const Main = () => {
 

  return (
<Provider store={store}>
    <InitiateMapComponent/>
    <HashRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/export" element={<Export />} />
        </Routes>
    `</HashRouter>
      
</Provider>
  )
}

ReactDOM.render( <Main/>, root)

