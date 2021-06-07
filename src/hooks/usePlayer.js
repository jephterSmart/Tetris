import { useCallback,  useState } from "react";

import { collision,STAGE_WIDTH } from "../utils/gameHelper";
import {TETROMINOS} from "../utils/tetrominos"



const usePlayer = (nextPlayer,resetNextPlayer) => {
    
    const [player, setPlayer] = useState({
        pos: {
            x: STAGE_WIDTH /2 - 2, y:0
        },
        collided: false,
        tetromino: TETROMINOS[0].shape
    });
    
    
    const rotate = (tetromino, dir) => {
        //This help transpose the n-dimensional player. i.e., convert
        //cols to rows, vice-versa.
        const transposedTetromino = tetromino.map((_,ind) => tetromino.map(tetroCell => tetroCell[ind]));
        //This actually cause the rotation
        if(dir > 0){
            //i.e., clockwise
            return transposedTetromino.map(row => row.reverse());
        }
        else{
           return transposedTetromino.reverse()
        }
    }
    const playerRotateTetro = (stage,dir) =>{
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino,dir);

        /* To avoid breaks when we rotate the tetromino or character, we've to disallow 
        *  some rotations, once we detect collision with side wall of stage.
        */
        let posX = clonedPlayer.pos.x;
        let offset = 1;
        while(collision(clonedPlayer,stage,{dx:0,dy:0})){
            clonedPlayer.pos.x += offset;
            /* This ensures that if we rotate our tetromino left and we try to get
            * away from the stage, it will push the tetromino back to the stage by adding
            * to the "x" position, and if due to our rotation, it try to go beyond the stage, 
            * it will subtract from "x" position of the tetromino.
            */ 
            offset = -(offset + (offset > 0 ? 1 : -1));
            //This ensures that we don't enter an infinite loop, incase we've 
            //offset greater than the length of tetromino, then we should stop the rotation.
            if(Math.abs(offset) > clonedPlayer.tetromino.length){
                rotate(clonedPlayer.tetromino,-dir)
                clonedPlayer.pos.x = posX;
                return;
            }
            
        }
        setPlayer(clonedPlayer);
    }
    const updatePlayerPos = ({dx,dy,collided}) => {
        
        setPlayer(prevPlayer => (
            {
                ...prevPlayer,
                pos:{x:(prevPlayer.pos.x + dx),y:(prevPlayer.pos.y + dy) },
                collided
            }
           ));
        
    }
    const resetPlayer =useCallback(() => {
        
        setPlayer(nextPlayer);
    },[nextPlayer]);
    
    return [player,updatePlayerPos,resetPlayer,playerRotateTetro];
}
export default usePlayer;