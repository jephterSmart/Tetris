import React from 'react';


import classes from './display.module.css'

const Display = ({gameOver, text,onClick}) => {
    let renderClassName = [classes.display]
    if(onClick) renderClassName.push(classes.clicked)
    renderClassName = renderClassName.join(' ');
    return(
        <div className={renderClassName} style={{color: gameOver ? 'red' : 'white'}} onClick={onClick}>
            {text}
        </div>
    );
}

export default Display;