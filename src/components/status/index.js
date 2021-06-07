import React from 'react';

import Display from '../display';


const Status = ({status,gameOver}) => {
    return(
        <aside >
            {gameOver ? <Display text={'Game over'} gameOver/>:(
                status.map((stat,ind) => <Display key={ind} text={stat} />)
            )}
        </aside>
    )
}

export default Status;
