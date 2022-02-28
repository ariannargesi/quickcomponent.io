import React from 'react'
import { useState , useRef, useEffect} from "react";
import { useSpring, animated } from 'react-spring'
import propTypes from 'prop-types'
import { ChevronDown, ChevronUp } from 'react-feather'
import "./styles.css";


const Groups = (props) => {
  const ref = useRef(null);

  const [toggle, setToggle] = useState(false)
  const [style, animate] = useSpring(() => ({ height: "0px" }), []);

  useEffect(() => {
    animate({
      height: (toggle ? ref.current.offsetHeight : 0) + "px",
      config: {duration: toggle ? 150 : 0}
    });
  }, [animate, ref, toggle]);
  const toggleState = () => setToggle(!toggle)
  return (
    <div className='group'>
      <div className='header'>
        <label>{props.label}</label>
        <span onClick={toggleState}>{toggle ? <ChevronUp/> : <ChevronDown/>}</span>
      </div>
      <animated.div style={{
            
            overflow: "hidden",
            width: "100%",
            ...style
          }} className='body' >
        {toggle && (
          <div ref={ref}>
              {props.children}
          </div>
        )}
      </animated.div>
    </div>
  )
}


export default Groups


Groups.propTypes = {
    children: propTypes.array,
    label: propTypes.string
}