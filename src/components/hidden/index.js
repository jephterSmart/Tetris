import React from  'react';

import classes from './hidden.module.css';

const Hidden = ({smUp,smDown,children}) =>{
    const renderedClass =[];
    if(smUp){
        renderedClass.push(classes.mobileOnly)
    }
    if(smDown){
        renderedClass.push(classes.desktopOnly);
    }
    return(
        <div className={renderedClass.join(' ')}>
            {children}
        </div>
    )
}
export default Hidden