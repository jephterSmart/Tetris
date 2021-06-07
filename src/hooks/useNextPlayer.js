import { useState} from 'react';
import { tetrominoGenerator } from '../utils/tetrominos';
import {STAGE_WIDTH} from '../utils/gameHelper';

 
const useNextPlayer = () => {
    const [nextPlayer, setNextPlayer] = useState({
        pos: {
            x: STAGE_WIDTH /2 - 2, y:0
        },
        collided: false,
        tetromino: tetrominoGenerator().shape
    });
    
   const resetNextPlayer = () => {
        setNextPlayer({
            
                pos: {
                    x: STAGE_WIDTH /2 - 2, y:0
                },
                collided: false,
                tetromino: tetrominoGenerator().shape
            }
        )
    }
return [nextPlayer,resetNextPlayer];
}
export default useNextPlayer;