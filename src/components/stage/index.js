import React from 'react';

import classes from './stage.module.css'
//components
import Cell from '../cell';

const Stage = ({stage,shake}) => {
    return (
        <div className={classes.Stage} style={{transform:`${shake? 'scale(1.2,1.2)': 'scale(1.0,1.0)'}`}}>
            {stage.map((row,x) => row.map((cell,y) => <Cell key={3*x+y} type={cell[0]} />))}
        </div>
    )
}

export default Stage;