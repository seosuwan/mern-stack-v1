import React, { useState } from "react";
import nor1 from 'features/review/garden/images/normal/1.png'
import nor2 from 'features/review/garden/images/normal/2.png'
import nor3 from 'features/review/garden/images/normal/3.png'
import red4 from 'features/review/garden/images/red/4.png'
import red5 from 'features/review/garden/images/red/5.png'
import 'features/review/style/gridStyle.scss'

export default function Flower() {
    const [ step, setStep ] = useState(1)
    const grow = () => {
        if(step===1) {
            return(<img className='flower-img' src={nor1}/>)
        }if (step===2) {
            return(<img className='flower-img' src={nor2}/>)
        }if (step===3) {
            return(<img className='flower-img' src={nor3}/>)
        }if (step===4) {
            return(<img className='flower-img' src={red4}/>)
        }if (step===5) {
            return(<img className='flower-img' src={red5}/>)
        }else {
            setStep(1)
        }
    }
    return(
        <div  className="flower-div" >
            <h1>꽃을 키워보자!</h1>
            <div>{grow()}</div>
            <p>STEP : {step}</p>
            <button onClick={()=>setStep(step + 1)}>Grow UP!</button>
        
        </div>  
    )
}