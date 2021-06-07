import React from 'react';


import classes from './modal.module.css';

const Modal = ({modalOpen,onClose,children}) =>{
    return(
        <div className={modalOpen ?classes.Backdrop : classes.hidden}>
            <div className={classes.Modal} onClick={onClose}>
                {children}
            </div>
        </div>
    )
}

export default Modal;