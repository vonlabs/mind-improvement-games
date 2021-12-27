import styled  from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';

export const ButtonsContainer = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin-bottom: 16px;
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
