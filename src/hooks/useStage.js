import {useState, useEffect} from 'react';

import {createStage,createNextTetro} from '../utils/gameHelper';

const useStage = (player,resetPlayer,nextPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [nextTetro, setNextTetro] = useState(createNextTetro());
    const [rowsCleared,setRowsCleared] = useState(0);

    const resetStage =() => {
        setStage(createStage());
        resetPlayer();
        //setNextTetro(createNextTetro());
    }
    
    useEffect(()=> {
        setRowsCleared(0)
        const sweepRows = newStage => {
           return newStage.reduce((acc,row) => {
                if(row.findIndex(cell => cell[0] === 0 ) === -1 ){
                    setRowsCleared(prev => prev + 1);
                    acc.unshift(new Array(newStage[0].length).fill([0,'clear']));
                   
                    return acc;
                    //here note those rows where not added back.
                }
                acc.push(row);
                return acc;
            },[]);
        }
        //update Stage
        /* we'll define the update function inside the useEffect, so as to not list it 
        * as a dependency
        */
       const updateStage = prevStage => {
        //Let's flush the stage optimally
        /* -- Why This is important -- 
        * To explain, I am going to give it context, let say we move the tetromino down, i.e.,
        * increment y. First, for us to make that motion, we have to flush the top, where there 
        * was tetromino cell or else we'll create one long or big object covering the screen.
        * We do this, by looking at the previous cells we've and check if their "clear" property is set,
        * since the "clear" property that determine whether we can remove it from the stage. If this is set
        * irrespective of what is formerly there, set it back to a blank cell,i.e.,[0,'clear']. But let say,
        * we've already merged with other cell in the stage, i.e., the "clear" property has been set to 
        * "merged", then we know, we can't remove it, i.e keep that cell in the stage, by setting the cell to
        * whatever it was before([<any tetromino>,'merged']).
        */
        // const newStage = createStage();
        // for(let row = 0; row< prevStage.length ; row++){
        //     for(let cell = 0 ; cell < row.length; cell++){
        //         if(prevStage[row][cell][1] === 'clear'){
        //             newStage[row][cell] = [0,'clear']
        //         }
        //         else {newStage[row][cell][0] = prevStage[row][cell][0];
        //             newStage[row][cell][1] = prevStage[row][cell][1]
        //         }
        //     }
        // }
        const newStage = prevStage.map(row => row.map(cell => cell[1] === 'clear' ? [0,'clear']: cell))
        //This code help detect changes and add changes to stage optimally
        for(let row = 0; row< player.tetromino.length ; row++){
            for(let tetroCell = 0; tetroCell< player.tetromino.length ; tetroCell++){
                if(player.tetromino[row][tetroCell] !== 0){
                     newStage[row + player.pos.y][tetroCell+ player.pos.x] = 
                        [player.tetromino[row][tetroCell], `${player.collided ? 'merged' : 'clear'}`];
                }
            }
        }//End of for loop
        if(player.collided){
            resetPlayer();
            
            
            return sweepRows(newStage);
        } 
        return newStage;
       }

       setStage(prev => updateStage(prev))
       
    },[player,resetPlayer]);

    useEffect(() => {
        const nextTetroStage = createNextTetro();
       
         for(let row = 0; row< nextPlayer.tetromino.length ; row++){
            for(let tetroCell = 0; tetroCell< nextPlayer.tetromino.length ; tetroCell++){
                if(nextPlayer.tetromino[row][tetroCell] !== 0){
                     nextTetroStage[row + 3][tetroCell+ 3] = 
                        [nextPlayer.tetromino[row][tetroCell], 'clear'];
                }
            }
        }
        setNextTetro(nextTetroStage);
    },[nextPlayer])
    return[stage,nextTetro,resetStage,rowsCleared];
}
export default useStage;