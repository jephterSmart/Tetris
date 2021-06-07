import React, { useEffect, useRef, useState } from 'react';

import classes from './tetris.module.css';

//components
import Status from '../../components/status';
import StartButton from '../../components/start_button';
import Stage from '../../components/stage';
import NextTetro from '../../components/next_tetro';
import Modal from '../../components/modal';
import Display from '../../components/display';
import Hidden from '../../components/hidden';

//hooks
import useStage from '../../hooks/useStage';
import usePlayer from '../../hooks/usePlayer';
import useInterval from '../../hooks/useInterval';
import useGameStatus from '../../hooks/useGameStatus';
import useNextPlayer from '../../hooks/useNextPlayer';

//utils
import {collision} from '../../utils/gameHelper'

//Sounds
import gameOverSound from '../../media/game-over.wav'
import silverSound from '../../media/silver.wav';
import goldSound from '../../media/gold.wav';
import shakeSound from '../../media/shake.wav';
import soundOne from '../../media/sound1.mp3';
import soundTwo from '../../media/sound2.mp3';
import soundThree from '../../media/sound3.mp3';

//gifts
import Silver from '../../components/gifts/silver';
import Gold from '../../components/gifts/gold';

const Tetris = () => {
const GameStatus = ['Score: 0', 'Rows: 0', 'Level: 0'];

const [gameOver,setGameOver] = useState(false);
const [dropTime, setDropTime] = useState(null);
const [menu,setMenu] = useState(false);
const [startGameState,setStartGame] = useState(true);
//decorations
const GameOverRef = useRef();
const SilverRef = useRef();
const GoldRef = useRef();
const ShakeRef = useRef();

const [silverGift,setSilverGift] = useState(false);
const [goldGift,setGoldGift] = useState(false);
const [shake,setShake] = useState(false);

const [playingUrl,setPlayingUrl] = useState(soundTwo);
const playingRef = useRef();


//my custom hooks
const  [nextPlayer,resetNextPlayer] = useNextPlayer();
const [player,updatePlayerPos,resetPlayer,rotateTetro] = usePlayer(nextPlayer);
const [mainStage, nextTetroStage,resetStage,rowsCleared] = useStage(player,resetPlayer,nextPlayer);
useInterval(()=> {
    moveDown({interval: true})
},dropTime);
//due to double page rendering, "rowsCleared" is been doubled, so therefore we divide by 2
const [score,setScore,level,setLevel,rows,setRows] = useGameStatus(rowsCleared/2);

const startGame = () =>{
    resetStage();
    
    resetNextPlayer();
    
    setGameOver(false);
    setDropTime(1000);
    setScore(0);
    setLevel(0);
    setRows(0);
    setStartGame(true);
    playingRef.current.play();
    setTimeout(() => {
        setStartGame(false);
       
    },700)
}
const disableArrowKeys = ({keyCode}) => {
    if(keyCode > 36 && keyCode < 41) {
        return false;
    }
}
const pauseGame = () => {
    
    setDropTime(null);
    setMenu(true);

}

const resumeGame = () => {
    setDropTime(1000 / (level + 1) + 200);
    setMenu(false);
    
}

const moveLeftOrRight = ({keyCode}) => {
    
    
        if(keyCode === 37){
            if(!collision(player,mainStage,{dx:-1,dy:0})){
                updatePlayerPos({dx: -1, dy: 0,collided:false});
            }
            return;
        }  
        if(keyCode === 39) {
            if(!collision(player,mainStage,{dx:1,dy:0})){
                updatePlayerPos({dx: 1, dy: 0,collided:false});
            }
            return;
        }  
   
}
const moveDown=({keyCode,interval}) => {
    if(keyCode === 40 || interval ){
        //check player "y position", then resetNextPlayer
        if(player.pos.y === 1){
            resetNextPlayer();
        }
        //increase the level of player if player has cleared 10 rows;
        if(rows > (level + 1) * 10){
            setLevel(prev => prev + 1);
            //and increase speed, as level has increased.
            setDropTime(1000/(level + 1) + 200);
        }
        if(!collision(player,mainStage,{dx:0,dy:1})){
            updatePlayerPos({dx: 0, dy: 1,collided:false});
        }
        else{
            //before updating, we can check if we've reach the top of the stage, hence game over
            if(player.pos.y<1){ // we know we've reach the top
                setGameOver(true);
                setDropTime(null);
                setStartGame(true);
               

            }
           
            /* This is where the magic Is. Because, once you collide downwards, 
             * you're now part of the stage, and that cell will change the state 
             * from 'clear' to 'merged'.
             */ 
            updatePlayerPos({dx: 0,dy: 0,collided: true});
        }
    }
    
       
        
      
    
    
}

const dropTetro = ({keyCode}) => {
    if(keyCode === 40) {
        setDropTime(null);
        moveDown({keyCode})
    }

}
const rotateTetromino = ({keyCode}) => {
    //If the up arrow key is pressed
    if(keyCode === 38){
        rotateTetro(mainStage,1);
    }
}
const keyDownHandler = (e) => {
    if(!gameOver){
        moveLeftOrRight(e);
        dropTetro(e);
        rotateTetromino(e);
        
    }
    
}
const keyUpHandler = ({keyCode}) => {
    if(!gameOver){
        if(keyCode === 40){ // for down arrow
            setDropTime(1000/(level + 1) + 200);
        }
    }
}
const changeLevel =() => {
    setLevel(prev => prev + 1);
}
useEffect(() => {
    if(gameOver){
        GameOverRef.current.play();
        playingRef.current.pause();
        playingRef.current.currentTime = 0;
    }
    
},[gameOver])
useEffect(()=> {
    const sounds = [soundOne,soundTwo,soundThree];
    if(level+1 % 2 === 0){
        setPlayingUrl(sounds[Math.floor(Math.random()*3)]);
    }
},[level])
useEffect(() => {
    if(rowsCleared / 2 === 2){
        setSilverGift(true);
        playingRef.current.pause();
        SilverRef.current.play()
        setTimeout(()=>{
            setSilverGift(false)
           
            SilverRef.current.pause();
            playingRef.current.play()
            SilverRef.current.currentTime=0;
        },3000);
    }
    
    else if(rowsCleared /2 === 3){
        setGoldGift(true);
        playingRef.current.pause();
        GoldRef.current.play();
        setTimeout(()=>{
            setGoldGift(false);
            GoldRef.current.pause()
            playingRef.current.play()
            GoldRef.current.currentTime = 0;
        },3200)
    }
    else if(rowsCleared /2 === 4){

        setShake(true);
        playingRef.current.pause();
        ShakeRef.current.play();
        setTimeout(() => {
            setShake(false);
            ShakeRef.current.pause();
            playingRef.current.play();
            ShakeRef.current.currentTime = 0;
        },2500);
    }
    
},[rowsCleared])
GameStatus[0] = `Score: ${score}`;
GameStatus[1] = `Rows: ${rows}`;
GameStatus[2] = `Level: ${level}`;
    return(
        <>
        <div className={classes.Container} role='button' tabIndex='0' 
        onKeyDown={menu ? disableArrowKeys : keyDownHandler} onKeyUp={keyUpHandler}>
            <div className={classes.Wrapper}>
                <Hidden smDown>
                <Status status={GameStatus} gameOver={gameOver}/>
                </Hidden>
                <Stage stage={mainStage} shake={shake }/>
                <div className={classes.Right}>
                    <Hidden smDown>
                    <NextTetro  stage={nextTetroStage}/>
                    </Hidden>
                    {startGameState ? (
                        <>
                        <Hidden smDown>
                      <StartButton onClick ={startGame} text="Start Game"/>
                      </Hidden>
                      <Hidden smUp >
                      <Modal modalOpen={startGameState}>
                            <StartButton onClick ={startGame} text="Start Game"/>
                          </Modal> 
                          </Hidden>   
                      </>
                    ):(
                        <>
                        <Hidden smDown>
                        <StartButton onClick ={pauseGame} text="Pause" />
                        </Hidden>
                        <Hidden smUp>
                            <div onClick={pauseGame} className={classes.pauseBtn}>
                                Pause
                            </div>
                        </Hidden>
                        </>
                    )}
                   <Modal modalOpen={menu} onClose={resumeGame}>
                        <Display text="Resume Game" onClick={resumeGame}/>
                        <Display text="Increase Level" onClick={changeLevel}/>
                   </Modal>
                   <Modal modalOpen={gameOver} onClose={startGame}>
                        <Status status={GameStatus} />
                   </Modal>
                </div>
            </div>
        </div>
        <div>
        <Silver play={silverGift}/>
        <Gold play={goldGift} />
            <audio ref={GameOverRef} >
            
                <source src={gameOverSound} media='wav' />
            </audio>
            <audio ref={SilverRef} >
            
                <source src={silverSound} media='wav' />
            </audio>
            <audio ref={GoldRef} >
            
            <source src={goldSound} media='wav' />
            </audio>
            <audio ref={ShakeRef} >
                
                <source src={shakeSound} media='wav' />
            </audio>
            <audio ref={playingRef} loop={true}>
                
                <source src={playingUrl} media='mp3' />
            </audio>
        </div>
        </>
    )
}
export default Tetris;