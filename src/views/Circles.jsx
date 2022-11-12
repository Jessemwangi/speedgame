import React from "react";
import "./Circle.css";
const Circles = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.index === props.circleNo ? "red" : "blue",
      }}
      className="circle"
      onClick={props.Cclicked}
      >
          {setTimeout(() => {
        <p>{props.index}</p>;
      }, 5000)}
    </div>
  );
};

export default Circles;
