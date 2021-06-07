export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;
export const createStage = () => {
    return Array.from(new Array(STAGE_HEIGHT),() => {
        return new Array(STAGE_WIDTH).fill([0,'clear'])
    })
};
export const createNextTetro = () => {
    return Array.from(new Array(10),() => {
        return new Array(10).fill([0,'clear'])
    })
}
export const collision = (player,stage,{dx,dy}) => {
    
    for(let row = 0; row< player.tetromino.length ; row++){
        for(let tetroCell = 0; tetroCell< player.tetromino.length ; tetroCell++){
            //We check tetroCell that aren't zero
            
            if(player.tetromino[row][tetroCell] !== 0){

               if(
                   //We check that we're not colliding with the bottom of stage. If it
                   //collide, this will return undefined,hence get short-circuited
                   !stage[row + player.pos.y + dy] ||
                   //next we check that we're not colliding with the side of stage, again if it collide
                   //it will return undefined and thus get short circuited
                   !stage[row +player.pos.y + dy][tetroCell + player.pos.x + dx] ||
                   //Then lastly, we check if we're colliding with a cell that has already merged to the
                   //stage, by looking at the "clear" property of the cell we're moving to with dx or dy.
                   stage[row +player.pos.y + dy][tetroCell + player.pos.x + dx][1] !== 'clear'
               ){
                
                   return true;
               }
            }
        }
    }//end of for loop;

}
