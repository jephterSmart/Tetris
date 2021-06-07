import React from 'react';

import {TETROMINOS} from '../../utils/tetrominos';

const Cell = ({type}) => {
    let styles = {
        width: 'auto',
        border: type===0 ? '0px solid' : '4px solid',
        backgroundColor: `rgba( ${TETROMINOS[type].color}, 0.8)`,
        borderBottomColor:  `rgba( ${TETROMINOS[type].color}, 0.3)`,
        borderLeftColor:  `rgba( ${TETROMINOS[type].color}, 0.1)`,
        borderRightColor:  `rgba( ${TETROMINOS[type].color}, 1)`,
        borderTopColor:  `rgba( ${TETROMINOS[type].color}, 1)`,
    }
    return (
        <div style={styles}></div>
    )
}

export default React.memo(Cell);