import React from 'react'
import Slider from "@mui/material/Slider";
import style from './style.module.sass'
import Radio from '../Radio'

const WidthAndHeight = () => {
    // read the values from redux 
    // return (
    //     <>
    //     <div>
    //         <div className={style.flex}>
    //             <div className={style.left}>
    //                 <span>Width:</span>
    //             </div>
    //             <div className={style.right}>
    //                 <Slider
    //                     size={"small"}
    //                     defaultValue={0}
    //                     max={500}
    //                     aria-label={"Small"}
    //                     valueLabelDisplay={"auto"}
    //                 />

    //             </div>
    //         </div>
    //     </div>
    //     <div>
    //         <div className={style.flex}>
    //             <div className={style.left}>
    //                 <span>Height:</span>
    //             </div>
    //             <div className={style.right}>
    //                 <Slider
    //                     size={"small"}
    //                     defaultValue={0}
    //                     max={500}
    //                     aria-label={"Small"}
    //                     valueLabelDisplay={"auto"}
    //                 />

    //             </div>
    //         </div>
    //     </div>
    //     </>
    // )

    const units = ['px', '%', 'rem']

    return (
        <>
        <div className={style.container}>
            <div className={style.top}>
                <span>Width:</span>
                <Radio style={null} options={units} activeIndex={0} onChange={() => {}}/>
            </div>
            <div className={style.body}>
                <Slider
                    size={"small"}
                    defaultValue={0}
                    max={500}
                    aria-label={"Small"}
                    valueLabelDisplay={"auto"}
                />

            </div>
        </div>
        <div className={style.container}>
            <div className={style.top}>
                <span>Width:</span>
                <Radio style={null} options={units} activeIndex={0} onChange={() => {}}/>
            </div>
            <div className={style.body}>
                <Slider
                    size={"small"}
                    defaultValue={0}
                    max={500}
                    aria-label={"Small"}
                    valueLabelDisplay={"auto"}
                />

            </div>
        </div>
        </>
    )
}

export default WidthAndHeight