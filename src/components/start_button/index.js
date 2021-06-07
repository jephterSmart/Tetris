import React from 'react';

import classes from './button.module.css';

const StartButton = ({onClick,text}) => {
    return (<button className={classes.button} onClick={onClick} >
        {text}
    </button>)
};

export default StartButton;