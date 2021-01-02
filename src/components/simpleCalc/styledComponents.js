import styled, { css }  from 'styled-components';

export const GameButton = styled.div`
    width: 68px;
    height: 68px;
    border: 1px solid rgba(144, 202, 249, 0.5);
    margin: 0;
  ${props => props.highlight && css`
    background-color: rgba(144, 202, 249, 0.3);
  `}
  ${props => props.marked && css`
  background-color: rgba(144, 202, 249, 0.3);
`}
`;

export const GameRow = styled.div`
      display: flex;
      flex-direction: row;
`;

export const GameTable = styled.div`
      margin: 8px;
`;

export const Container = styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
      margin: 8px;
`;