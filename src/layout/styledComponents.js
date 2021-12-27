import React from 'react';
import styled  from 'styled-components';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const Container = styled.div`
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      justify-content: center;
`;

export const ButtonsContainer = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      height: 120px;
`;

export const GameButton = styled(Button)`
      border: 1px solid rgba(144, 202, 249, 0.5);
      margin: 6px;
` 

export const FAB = styled(({ ...props }) => 
      <Button 
            {...props} 
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
      />)`
      position: absolute;
      top: 0;
      right: 0;
      margin: 16px;
`;

const TitleContainer = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 20px;
` 

export function Title(props) {
      return (
        <TitleContainer>
            <p>
                {props.children}
            </p>
        </TitleContainer>
      );
}