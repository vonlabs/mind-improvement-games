import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import {Container, GameButton, GameRow, GameTable} from './styledComponents'
import {createRandomArray} from './functions'
import ButtonNumber from '../ButtonNumber'
import ButtonGamePlay from '../ButtonGamePlay'


const size = {height: 12,
                width: 12};

export default function GroupSizesColors() {
  const [highlightArray, setHighlightArray] = useState(mapHighlightArray(size));
  const [chosenSize, setChosenSize] = useState({height: 0, width: 0});
  const [lastGoodButton, setLastGoodButton] = useState(0);
  const [arrayOfnumbers, setArrayOfnumbers] = useState([]);
  const [wellPressedArray, setWellPressedArray] = useState([]);
  const [finishedGame, setFinishedGame] = useState(false);
  const [wrongNumber, setWrongNumber] = useState([]);



  function renderChooseSize (size) {
    let wholeTable = [];
        for (let height=0; height < size.height; height++) {
            let row = [];
            for (let width=0; width < size.width; width++) {
                row.push(<GameButton
                    highlight={highlightArray[height][width] ? true : false}
                    onMouseEnter={() => setHighlightArray(mapHighlightArray(size,height,width))}
                    onClick={() => {setChosenSize({height, width});
                                    setArrayOfnumbers(createRandomArray({height, width}));}}
                >
                </GameButton>);
            }
            wholeTable.push(<GameRow>{row}</GameRow>);
        }   
        return wholeTable
    }

    function mapHighlightArray (size,height,width){
        let wholeTable = [];
        for (let i=0; i < size.height; i++) {
            let row = [];
            for (let j=0; j < size.width; j++) {
                row.push(i <= height && j <= width ? true : false);
            }
            wholeTable.push(row);
        }   
        return wholeTable
    }

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

    function renderGameBoardChoice (){
        return <GameTable
                    onMouseLeave={() => setHighlightArray(mapHighlightArray(size))}
                >
                    {renderChooseSize(size)}
                </GameTable>
    }

    function renderGameBoard (){
        let wholeTable = [];
        for (let height=0; height <= chosenSize.height; height++) {
            let row = [];
            for (let width=0; width <= chosenSize.width; width++) {
                let number = arrayOfnumbers[(height*(chosenSize.width+1))+width];
                let marked = wellPressedArray && wellPressedArray[height] && wellPressedArray[height][width];
                row.push(<ButtonNumber
                            marked={marked}
                            onClick={()=> !marked && checkForGoodButton(chosenSize, number, height, width)}
                        >
                        {number}
                        </ButtonNumber>);
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
            if (number === ((chosenSize.height+1) * (chosenSize.width+1))){
                setFinishedGame(true)
            }
        }
        else return console.log('not ok')
    }


    function theGame () {
        if (chosenSize.height === 0 && chosenSize.width === 0) {
            return renderGameBoardChoice()
        } else if (!finishedGame){
            return renderGameBoard()
        } 
        else if (finishedGame){
            console.log('fnishshed');
            return renderGameBoard();
        } 
    }

    function resetGame() {
        setHighlightArray(mapHighlightArray(size));
        setChosenSize({height: 0, width: 0});
        setLastGoodButton(0);
        setArrayOfnumbers([]);
        setWellPressedArray([]);
        setFinishedGame(false);
    }

  return (
    <Container>
        <ButtonGamePlay 
            variant="outlined" 
            color="primary"
            onClick={()=>resetGame()}
        >
            Reset Game
        </ButtonGamePlay>
        {theGame()}        
    </Container>
  );
}