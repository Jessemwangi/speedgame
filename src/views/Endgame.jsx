import React from 'react';
import "../Main.css";

const Endgame = (props) => {
    return (
        <div  className={props.celebrate || 'endGame below20'}>
            {props.scores}
        </div>
    );
};

export default Endgame;