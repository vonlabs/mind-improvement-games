import React, { useState, Fragment } from 'react';
import {Container, GameButton, Title, ButtonsContainer, FAB} from './styledComponents'



export default function Layout(props) {
  const [game, setGame] = useState(1);
  return (
    <Container>
         {  
            game === -1 ?
            <Fragment>
                <Title>
                    Choose your mind improvement game
                </Title>
                <ButtonsContainer>
                    {props.games.map((elem, index) => 
                        <GameButton
                            key={`gamebtn_${index}`}
                            onClick={()=>{setGame(index)}}
                        >
                            {elem.name}
                        </GameButton>
                    )}
                </ButtonsContainer>
            </Fragment>
            :
            <FAB
                onClick={()=>{setGame(-1)}}
            >
                Go Back
            </FAB>
        }
        <div className='gameContainer'>
        {props.games.map((elem, index) => {
            if(game === index) return elem.game
            return null
        })}
        </div>
    </Container>
  );
}