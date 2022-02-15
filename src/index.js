import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import store from './redux'
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'

const root = document.getElementById('root')
ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, root)
