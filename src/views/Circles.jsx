import React from "react";
import "./Circle.css";
const Circles = (props) => {
  return (
    <div
      // style={{
        
      //   backgroundColor: props.index === props.circleNo 
      //   ? "red" : "blue" //radial-gradient(circle, blue 30%, pink 50%, red 20%, blue 10%)
      // }}
      
      className={props.index === props.circleNo 
      ? "circle Active" : "circle InActive"}
      onClick={props.Cclicked}>
        
        <p>{props.index}</p>
     
    </div>
  );
};

export default Circles;
