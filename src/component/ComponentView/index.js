import{ useSelector } from 'react-redux'
import arrayToComponent from '../../helper/arrayToComponent'
import React from 'react'

const ComponentView = () => {
    const html = useSelector(state => state.html)
    const component = arrayToComponent(html)
   
    return component 
}

export default ComponentView 