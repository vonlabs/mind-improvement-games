import styled  from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';

export const GameRow = styled.div`
      display: flex;
      flex-direction: row;
`;

export const GameTable = styled.div`
      margin: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
`;

export const GameContainer = styled.div`
      display: flex;
      flex-direction: column;
      height: 200px;
      width: 440px;
      justify-content: center;
      margin: 16px;
      margin: auto;
      justify-content: center;
      align-items: center;
`;

export const ButtonsContainer = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
`;

export const GameStateButton = styled(Button)`
      width: 128px;
      margin-right: 8px;
      height: 50px;
`;


export const Timer = styled.div`
      flex-grow: 1;
      margin-left: 24px;
      p { text-align: end; }
      p:first-child { font-weight: bold; }
`;

export const AnswerButtonGroup = styled(ButtonGroup)`
      height: 42px;
      margin-top: 8px;
`;


export const AnswerButton = styled(Button)`
      width: 60px;
`;
