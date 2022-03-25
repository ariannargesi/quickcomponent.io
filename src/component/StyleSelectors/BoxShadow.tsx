import React, { useState } from 'react'
import Slider from "@mui/material/Slider";
import { ChevronDown, ChevronUp, ChevronRight } from 'react-feather'
import { Collapse } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.sass'
import Radio from '../Radio'
import { applyStyle } from '../../redux/slice'
import ColorPicker from '../ColorPicker'

const { Panel } = Collapse;

const WidthAndHeight = () => {

    const dispatch = useDispatch()
    const [showMore, setShowMore] = useState(false)

    const units = ['px', '%', 'rem']
    let shadow = '2px 2px 2px 4px rgba(128,154,145, 0.5)'
    let shadowPieces: string[] = shadow.split('px')

    const horzontalOffest: string = shadowPieces[0] 
    const verticalOffste: string = shadowPieces[1] 
    const blurRadius: string = shadowPieces[2] 
    const spreadRadius: string = shadowPieces[3] 
    const color: string = shadowPieces[3]
    
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

        dispatch(applyStyle({
            key: 'boxShadow',
            value: shadowString
        }))
    }


    return (
        <>
          <div className={style.boxShadow} onClick={handleToggle}>
                <span>Box shadow</span> 
                {showMore ? <ChevronDown/> : <ChevronRight/>}
          </div>
          {showMore && (
            <div>
                <div>
                    <div>
                        Horizontal offset:
                    </div>
                    <div>
                        <Slider
                            size={"small"}
                            defaultValue={Number(horzontalOffest)}
                            max={500}
                            aria-label={"Small"}
                            valueLabelDisplay={"auto"}
                            onChange={(e: Event) => {
                                const value = (e.target as HTMLInputElement).value 
                                updateShadow(0, value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        Vertical offset:
                    </div>
                    <div>
                        <Slider
                            size={"small"}
                            defaultValue={Number(verticalOffste)}
                            max={500}
                            aria-label={"Small"}
                            valueLabelDisplay={"auto"}
                            onChange={(e: Event) => {
                                const value = (e.target as HTMLInputElement).value 
                                updateShadow(1, value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        Blur radius
                    </div>
                    <div>
                        <Slider
                            size={"small"}
                            defaultValue={Number(blurRadius)}
                            max={500}
                            aria-label={"Small"}
                            valueLabelDisplay={"auto"}
                            onChange={(e: Event) => {
                                const value = (e.target as HTMLInputElement).value 
                                updateShadow(2, value)
                            }}

                        />
                    </div>
                </div>
                <div>
                    <div>
                        Spread radius:
                    </div>
                    <div>
                        <Slider
                            size={"small"}
                            defaultValue={Number(spreadRadius)}
                            max={500}
                            aria-label={"Small"}
                            valueLabelDisplay={"auto"}
                            onChange={(e: Event) => {
                                const value = (e.target as HTMLInputElement).value 
                                updateShadow(3, value)
                            }}
                        />
                    </div>
                </div>
               <ColorPicker
                name='adsfs'
                values={null}
                    onChange={value => {
                        console.log(value)
                        updateShadow(4, value)
                    }}
                />
            </div>
          )}
        </>
    )
}

export default WidthAndHeight