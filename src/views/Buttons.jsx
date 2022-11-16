import React from "react";
import "./Button.css";

function Buttons(props) {
  return (
    <div>
      {props.start ==='true' ? (
        <button className="btend" onClick={props.EndGameHandler}>End Game</button>
      ) : (
        <button className="btstart" onClick={props.StartGameHandle}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default Buttons;
