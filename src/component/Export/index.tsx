import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CodeView from '../CodeView'
import ComponentConfig from '../CompnentConfig'
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

const Export = (props: any) => {

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
            <ChevronLeft 
                size={40} 
                onClick={goBack}
            />
            <div style={style.flex}>
                <ComponentConfig  />
                <div style={{ width: '550px' }}>
                    <CodeView />
                </div>
            </div>
        </div>
    )
}

export default Export


