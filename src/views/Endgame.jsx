import React from 'react';
import "./Circle.css";

const Endgame = (props) => {
    return (
        <div  className={props.scores >2 ? 'endGame above20' : 'endGame below20'}>
            {props.scores}
        </div>
    );
};

export default Endgame;