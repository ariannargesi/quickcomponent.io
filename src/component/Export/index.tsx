import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Output from '../Output'
import CodeConfig from '../CodeConfig'
import { generateCode } from '../../redux/slice/app'
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
                    <CodeConfig  />
                </div>
                <div style={{ width: '50vw', height: '100vh'}}>
                    <Output />
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Export


