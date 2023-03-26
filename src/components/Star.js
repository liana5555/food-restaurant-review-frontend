import React from "react";

export default function Star(props) {

    const type = props.type
    const style = {
         opacity: 0.25,
     
    }

    let stars = []
    
    if (!props.changable) {
        for (let i=1; i<=10; i++) {
        if (props.rating[type].rating >= i) {
           stars.push(<span key={"food" + i.toString()} id={i}>⭐</span>)
        }
        else {
            
            stars.push(<span key={"restaurant" + i.toString()} id={i} style={style}>⭐</span>)
        } 


        
    }

    }
    else {
        for (let i=1; i<=10; i++) {
            if (props.rating[type].temporary_rating >= i) {
               stars.push(<span key={i}
                                 id={i} 
                                 onMouseOver={()=> props.handleMouseOver(i, type)} 
                                 onMouseOut={() => props.handleMouseOut(type)}
                                 onClick={()=>props.handleClick(i, type)}>⭐</span>)
            }
            else {
                
                stars.push(<span key={i}
                                 id={i}
                                 style={style}
                                 onMouseOver={()=> props.handleMouseOver(i, type)}
                                 onMouseOut={()=>props.handleMouseOut(type)}
                                 onClick={() => props.handleClick(i, type)}>⭐</span>)
            } 
    }
}
        
    return (
        <div className="star-container">
            {stars}
        </div>
    )
}