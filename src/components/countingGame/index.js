import React, { useState, useEffect } from 'react';
import StyledBoardButton from '../StyledBoardButton'
import {Container, GameButton, GameRow, GameTable, ButtonsContainer} from './styledComponents'
import { Typography } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';

const timer = 10000;
const timerInterval = 25;
const digitsFromTo = [2,9];
const numberOfAnswers = 4;

const answerStatsInitial = {good: 0, done: 0};

export default function GroupSizesColors() {
  const [calculationObject, setCalculationObject] = useState({first: null, second: null, calc: null, answers: {answersArray: []}});
  const [answerStats, setAnswersStats] = useState(answerStatsInitial);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [miliSeconds, setMiliSeconds] = useState(timer);
  const [isTimerActive, setIsTimerActive] = useState(false);

    function toggleTimer() {
        setIsTimerActive(!isTimerActive);
    }

    function resetTimer() {
        setIsTimerActive(false);
        setMiliSeconds(timer);
    }

    useEffect(() => {
    let interval = null;
    if (isTimerActive && miliSeconds !== 0) {
        interval = setInterval(() => {
            setMiliSeconds(miliSeconds => miliSeconds - timerInterval);
        }, timerInterval);
    } else if (isTimerActive && miliSeconds == 0) {
        finishedTimeAndGame();
    } else if (!isTimerActive) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isTimerActive, miliSeconds]);

    function randomDigit(){
        return digitsFromTo[0] + Math.floor(Math.random() * (digitsFromTo[1]-digitsFromTo[0]+1)); // 2-9
    }

    function randomCalculation(){
        let calculations = ['x', '+', '-'];
        let index = Math.floor(Math.random() * (3));
        return calculations[index];
    }

    function generateAnswers(first, second, calc){
        let goodAnswer;
        switch (calc){
            case '-':
                goodAnswer = first - second;
               break; 
            case '+':
                goodAnswer = first + second;
                break; 
            case 'x':
                goodAnswer = first * second;
                break; 
        }
        let goodAnswerIndex = Math.floor(Math.random() * (numberOfAnswers-1));
        let answersArray = [];
        for (let i = 0; i < numberOfAnswers; i++){
            answersArray.push(goodAnswer-goodAnswerIndex+i);
        }
        return {goodAnswer, goodAnswerIndex, answersArray}
    }

    function answerCalculation(calculationObject, pressedButtonIndex){
      let temp = JSON.parse(JSON.stringify(answerStats));
      temp.done++;
      if (calculationObject.answers.goodAnswerIndex === pressedButtonIndex){
        temp.good++;
      }
      console.log(temp);
      setAnswersStats(temp);
      theCalculation();
    }

    function theCalculation(){
        let first = randomDigit();
        let second = randomDigit();
        let calc = randomCalculation();
        let answers = generateAnswers(first, second, calc);
        let calculationObject = {first, second, calc, answers}
        setCalculationObject(calculationObject);
        return calculationObject;
    }
    

    function startGame() {
        setGameStarted(true);
        setGameFinished(false);
        theCalculation();
        toggleTimer();
    };

    function resetGame() {
        setGameStarted(false);
        setGameFinished(false);
        setAnswersStats(answerStatsInitial)
        resetTimer();
    };

    function finishedTimeAndGame(){
        setGameFinished(true);
        setIsTimerActive(false);
        alert(`Finished`);
    };


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
                {isTimerActive ? 'End Game' : 'Reset Game'}
            </Button>
            <Typography>
                Pozostały czas: {(miliSeconds/1000).toFixed(parseInt(3))} s.
            </Typography> 
        </ButtonsContainer>
        <Container>
            <Typography>{calculationObject.first} {calculationObject.calc} {calculationObject.second} =</Typography>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {
                    calculationObject.answers.answersArray.map((elem,index) => 
                        <Button
                            onClick={()=>answerCalculation(calculationObject,index)}
                            disabled={!isTimerActive}
                        >
                            {elem}
                        </Button>)
                }
            </ButtonGroup>
        </Container>
    </Container>
  );
}