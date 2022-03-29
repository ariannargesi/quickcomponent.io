import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CodeView from '../CodeView'
import ComponentConfig from '../CompnentConfig'
import Footer from '../Footer'
import { generateCode } from '../../redux/slice'
import {  ChevronLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'
const style = {
    container: {
        width: '1200px',
        margin: '0 auto',
        height: '100vh',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

const Export = (props: any)=> {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(generateCode())
    }, [])

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div style={style.container}>
            
            <div style={style.flex}>
            <div style={{ width: '50vw', height: '100vh'}}>
                    <ComponentConfig  />
                </div>
                <div style={{ width: '50vw', height: '100vh'}}>
                    <CodeView />
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Export


