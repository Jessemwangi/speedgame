import React from 'react';
import './Modal.css';

function Modal(props) {
    return (
        <div className='modal'>
            <div id="finalscore" class="finalscore">
           
           <p className="modaldisplay"> {props.scores}</p>
           
            <span className='modalSpan' onClick={props.GameReset}>&#10060;</span>
       </div> 
            
        </div>
    );
}

export default Modal;