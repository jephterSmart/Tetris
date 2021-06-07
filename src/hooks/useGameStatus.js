import {useState,useCallback,useEffect} from 'react'

    //This gives us by how much we should increase the score,
    //based on the number of rows cleared.
    const linePoint = [40,100,300,1200];

const useGameStatus = rowsCleared => {
    const [rows,setRows] = useState(0);
    const [level,setLevel] = useState(0);
    const [score,setScore] = useState(0);

    

    const calcScore = useCallback(() => {
        if(rowsCleared > 0 && rowsCleared <5){
            setScore(prev => prev+ linePoint[rowsCleared -1] * (level +1) );
            
        }
        if(rowsCleared > 4 && rowsCleared < 9){
            let score = 1200 ; // This is the highest score
            score += (linePoint[(rowsCleared % 5)] * (level + 1)) + 80;
            setScore(prev => prev + score);
        }
        setRows(prev => rowsCleared + prev);
    },[rowsCleared,level])
    
    useEffect(() => {
        
        calcScore();
    },[calcScore,rowsCleared]);

    return [score,setScore,level,setLevel,rows,setRows];
}

export default useGameStatus;