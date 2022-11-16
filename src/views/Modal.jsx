import React from 'react';
import './Modal.css';

function Modal(props) {
    return (
        <div className='modal'>
            <div id="finalscore" class="finalscore">
           
           <p className="modaldisplay">{props.scores} 
           {props.scores <= 10 ? 'OOOPPS!! Best of luck next time' : 'HURRAY!!! WElDONE, ANOTHER ROUND PLEASE'}</p>           
            <span className='modalSpan' onClick={props.GameReset}>&#10060;</span>
       </div> 
            
        </div>
    );
}

export default Modal;