import React from 'react';
import './Button.css';

function Buttons(props) {
    return (
        <div>
            <button className='btstart'>Start Game</button>
            <button className='btend'>End Game</button>
        </div>
    );
}

export default Buttons;