import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import store from './redux'
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

import Export from './component/Export'
const root = document.getElementById('root')
ReactDOM.render(<Provider store={store}>
    <HashRouter>
    <Routes>

        <Route path="/" element={<App />} />
        <Route path="/export" element={<Export />} />
        </Routes>
      </HashRouter>
      
</Provider>, root)
