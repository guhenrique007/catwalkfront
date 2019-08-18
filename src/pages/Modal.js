import React, { Component} from 'react';
import './Modal.css'

import edit from '../assets/edit.svg';

class Modal extends Component{
     
    constructor(){
        super()
        this.state={
            showMe:true
        }
    }

    operation(){
        alert('hi');
    }

    render(){
        return(
            <div>
                <div className="buttons">
                    <button type="button" onClick={()=>this.operation()} >
                        <img src={edit} alt="Edit" />
                    </button>
                </div>
                
            </div>
        )
    }
}

export default Modal;