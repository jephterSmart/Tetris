import React from 'react';

import classes from './tetro.module.css'
//components
import Cell from '../cell';

const Stage = ({stage}) => {
    return (
        <div className={classes.Stage}>
            {stage.map((row,x) => row.map((cell,y) => <Cell key={3*x+y} type={cell[0]} />))}
        </div>
    )
}

export default Stage;