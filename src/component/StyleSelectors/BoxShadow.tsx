import React, { useState } from 'react'
import Slider from "../Slider";
import { ChevronDown, ChevronUp, ChevronRight } from 'react-feather'
import { Collapse } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.sass'
import Radio from '../Radio'
import ColorPicker from '../ColorPicker'
import useApplyStyle from '../../hooks/useApplyStyle';
import useStyleValue from '../../hooks/useStyleValue';


const WidthAndHeight = () => {
    const applyStyle = useApplyStyle()

    const dispatch = useDispatch()
    const [showMore, setShowMore] = useState(true)

    const units = ['px', '%', 'rem']
    let shadow =  useStyleValue('boxShadow') || '2px 2px 2px 4px rgba(128,154,145, 0.5)'
    let shadowPieces: string[] = shadow.split('px')

    const horzontalOffest = Number(shadowPieces[0])
    const verticalOffste = Number(shadowPieces[1] )
    const blurRadius = Number(shadowPieces[2] )
    const spreadRadius = Number(shadowPieces[3] )
    const color = shadowPieces[3]
    
    const handleToggle = () => setShowMore(!showMore)

    function updateShadow(index: number, value){
        // update that index 
        let shadowPieces: string[] = shadow.split('px')
        switch(index){
            case 0: 
                shadowPieces[0] = value 
                break
            case 1:
                shadowPieces[1] = value 
                break 
            case 2: 
                shadowPieces[2] = value 
                break 
            case 3: 
                shadowPieces[3] = value 
                break 
            case 4: 
                shadowPieces[4] = value 
                break 
        }
        
        let shadowString : string = shadowPieces.join('px ')
        console.log(shadowString)
         applyStyle('boxShadow', shadowString)
       
    }


    return (
        <>
          <div className={[style.container].join(' ')} >
              <div onClick={handleToggle} style={{display: 'flex', alignItems: 'center'}}>
                <span>Box shadow</span> 
                {showMore ? <ChevronDown/> : <ChevronRight/>}
                </div>
          {showMore && (
              <>
            <div className={style.content}>
                <Slider
                    labelInline
                    min={-100}

                    label='X'
                    value={horzontalOffest}
                    onChange={value => {
                        updateShadow(0, value)
                    }}
                />
                <Slider
                                    min={-100}

                    labelInline
                    label='Y'
                    value={verticalOffste}
                    onChange={value => {
                        updateShadow(1, value)
                    }}
                />
                <Slider
                    labelInline
                    label='radius'
                    value={blurRadius}
                    onChange={value => {
                        updateShadow(2, value)
                    }}
                />
                <Slider
                    labelInline
                    label='spread'
                    value={spreadRadius}
                    onChange={value => {
                        updateShadow(3, value)
                    }}
                />
                
              
            </div>
            <ColorPicker
                name='Shadow color'
                values={null}
                    onChange={value => {
                        updateShadow(4, value)
                    }}
                />
            </>
          )}
            </div>

        </>
    )
}

export default WidthAndHeight