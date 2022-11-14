import React from "react";
import "./Button.css";

function Buttons(props) {
  return (
    <div>
      {props.start ? (
        <button className="btend">End Game</button>
      ) : (
        <button className="btstart" onClick={props.StartGameHandle}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default Buttons;
