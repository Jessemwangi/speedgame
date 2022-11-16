import React from "react";
import "./Circle.css";
const Circles = (props) => {
  return (
    <div

      className={
        props.index === props.circleNo ? "circle Active" : "circle InActive"
      }

      onClick={props.gameStart ? props.Cclicked : null}
    >

    </div>
  );
};

export default Circles;
