import React, { useState, useEffect } from 'react';
import StyledBoardButton from '../StyledBoardButton'
import {Container, GameButton, GameRow, GameTable, ButtonsContainer} from './styledComponents'
import {createRandomArray} from './functions'
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default function GroupSizesColors() {
  const [chosenSize, setChosenSize] = useState({height: 1, width: 2});
  const [lastGoodButton, setLastGoodButton] = useState(0);
  const [arrayOfnumbers, setArrayOfnumbers] = useState(createRandomArray(chosenSize));
  const [wellPressedArray, setWellPressedArray] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startedAtTime, setStartedAtTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggleTimer() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


    function mapWellPressedArray (chosenSize,height,width,oldArray){
        let newArray = [];
        for (let i=0; i <= chosenSize.height; i++) {
            let row = [];
            for (let j=0; j <= chosenSize.width; j++) {
             if(oldArray !== undefined && oldArray[i] !== undefined && oldArray[i][j] === true) row.push(true)
                else if (height !== undefined  && width !== undefined  && i === height && j === width) row.push(true)
                else row.push(false)
            }
            newArray.push(row);
        }   
        return newArray
    }

    function renderGameBoard (){
        let wholeTable = [];
        for (let height=0; height <= chosenSize.height; height++) {
            let row = [];
            for (let width=0; width <= chosenSize.width; width++) {
                let number = arrayOfnumbers[(height*(chosenSize.width+1))+width];
                let marked = wellPressedArray && wellPressedArray[height] && wellPressedArray[height][width];
                row.push(<StyledBoardButton
                            marked={marked}
                            onClick={()=> !marked && checkForGoodButton(chosenSize, number, height, width)}
                        >
                        {number}
                        </StyledBoardButton>);
                }
            wholeTable.push(<GameRow>{row}</GameRow>);
        }   
        return <GameTable>
                    {wholeTable}
                </GameTable>
    };

    function checkForGoodButton (chosenSize, number, height, width) {
        if (lastGoodButton + 1 === number) {
            setWellPressedArray(mapWellPressedArray(chosenSize, height, width, wellPressedArray));
            setLastGoodButton(number)
            if (isActive && number === ((chosenSize.height+1) * (chosenSize.width+1))){
                finishGame();
            }
        }
        else return console.log('not ok')
    }

    function theGame () {
        console.log('theGame');
        if (gameStarted){
            return renderGameBoard()
        } 
        return startScreen();
    }

    function startScreen () {
        console.log('startScreen');
        return  <Container> 
                    <Typography>
                        Gra w której celem jest jak najszybsze zaznaczenie wszyskich liczb w kolejności od najmniejsze do największej.<br/>
                        Demo poniżej :)
                    </Typography> 
                    {renderGameBoard()}
                </Container>
    }

    function resetGame() {
        setChosenSize({height: 1, width: 2});
        setLastGoodButton(0);
        setArrayOfnumbers(createRandomArray({height: 1, width: 2}));
        setWellPressedArray([]);
        setGameStarted(false);
        setGameFinished(false);
        resetTimer();
    }

    function startGame() {
        let newSize = {height: 2, width: 2}
        let time = Date.now();
        setChosenSize(newSize);
        setLastGoodButton(0);
        setArrayOfnumbers(createRandomArray(newSize));
        setWellPressedArray([]);
        setGameStarted(true);
        setGameFinished(false);
        setStartedAtTime(time)
        toggleTimer();
    }

    function finishGame(){
        let time = Date.now()-startedAtTime;
        setStartedAtTime(time);
        alert(`Finished at ${time}s`)
        setGameFinished(true);
        setIsActive(false);
    }


  return (
    <Container>
        <ButtonsContainer>
            <Button 
                variant="outlined" 
                color="primary"
                onClick={()=>startGame()}
                disabled={gameStarted}
            >
                Start Game
            </Button>
            <Button 
                variant="outlined" 
                color="primary"
                onClick={()=>resetGame()}
                disabled={!gameStarted}
            >
                End Game
            </Button>
            <Typography>
                Czas: {seconds} s.
            </Typography> 
        </ButtonsContainer>
        {theGame()}        
    </Container>
  );
}