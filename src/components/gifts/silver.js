import React from 'react';

import classes from './silver.module.css';
function generateRandomSize(){
    const widthArr =[80,10,30,20,60,50,70];
    return widthArr[Math.floor(Math.random()* widthArr.length)];
}
const GenerateRandomShapeSize = ({cls}) => {
    let arr = [];
    for(let i = 0; i<9; i++){
        const randSize = generateRandomSize()
        arr.push(<div className={cls.join('')} style={{ width:randSize,height:randSize}} key={i}></div>)
    }
    return arr;
}
const Silver = ({play}) => {
    const cls = [classes.silver]
    // if(play) cls.push(classes.new)
    
    

    return (play && <div className={classes.container}>
        <GenerateRandomShapeSize cls={cls}/>
    </div>)
}
export default Silver;