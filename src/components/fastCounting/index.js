import React, { useState, useEffect } from 'react';
import { GameContainer, ButtonsContainer, Timer, AnswerButtonGroup, AnswerButton } from './styledComponents'
import { GameStateButton } from '../shared/styledComponents'
import { Typography } from '@material-ui/core';

const timer = 10000;
const timerInterval = 25;
const digitsFromTo = [2,9];
const numberOfAnswers = 4;

const calculationObjectInitial = {first: null, second: null, calc: null, answers: {answersArray: []}};
const answerStatsInitial = {good: 0, done: 0};

export default function GroupSizesColors() {
  const [calculationObject, setCalculationObject] = useState(calculationObjectInitial);
  const [answerStats, setAnswersStats] = useState(answerStatsInitial);
  const [gameStarted, setGameStarted] = useState(false);
  const [miliSeconds, setMiliSeconds] = useState(timer);
  const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isTimerActive && miliSeconds !== 0) {
            interval = setInterval(() => {
                setMiliSeconds(miliSeconds => miliSeconds - timerInterval);
            }, timerInterval);
        } else if (isTimerActive && miliSeconds === 0) {
            endGame();
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
    
    function toggleTimer() {
        setIsTimerActive(!isTimerActive);
    }

    function resetTimer() {
        setMiliSeconds(timer);
    }

    function stopTimer() {
        setIsTimerActive(false);
    }
    

    function startGame() {
        setGameStarted(true);
        theCalculation();
        toggleTimer();
    };

    function endGame() {
        setGameStarted(false);
        stopTimer();
        setCalculationObject(calculationObjectInitial);
    };

    function resetGame() {
        setAnswersStats(answerStatsInitial)
        resetTimer();
    };

  return (
    <GameContainer>
        <ButtonsContainer>
            <GameStateButton 
                variant="outlined" 
                color="primary"
                onClick={()=>startGame()}
                disabled={gameStarted || answerStats.done !== 0}
            >
                Start Game
            </GameStateButton>
            {
                isTimerActive ?
                <GameStateButton 
                    variant="outlined" 
                    color="primary"
                    onClick={()=>endGame()}
                    disabled={!gameStarted}
                >
                    End Game
                </GameStateButton>
                :
                <GameStateButton 
                    variant="outlined" 
                    color="primary"
                    onClick={()=>resetGame()}
                >
                    Reset Game
                </GameStateButton>
            }
            <Timer>
                <Typography>
                    Time left:
                </Typography> 
                <Typography>
                    {(miliSeconds/1000).toFixed(parseInt(3))} s.
                </Typography> 
            </Timer>
        </ButtonsContainer>
        <GameContainer>
            <Typography>{calculationObject.first} {calculationObject.calc} {calculationObject.second} {calculationObject.second && '='}</Typography>
            <AnswerButtonGroup color="primary" aria-label="outlined primary button group">
                {
                    calculationObject.answers.answersArray.map((elem,index) => 
                        <AnswerButton
                            onClick={()=>answerCalculation(calculationObject,index)}
                            disabled={!isTimerActive}
                        >
                            {elem}
                        </AnswerButton>)
                }
            </AnswerButtonGroup>
        </GameContainer>
        {
            (!gameStarted && (answerStats.done !== 0)) &&
            <GameContainer>
                <Typography>Good answers: {answerStats.good} </Typography>
                <Typography>All answers: {answerStats.done}</Typography>
                <Typography>Score: {parseInt(answerStats.good / answerStats.done * 100)}%</Typography>
            </GameContainer>
        }
    </GameContainer>
  );
}