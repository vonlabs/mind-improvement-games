import React from 'react';
import './App.css';
import { StylesProvider  } from '@material-ui/core/styles';

import OrderNumbers from './components/orderNumbers/index'
import FastCounting from './components/fastCounting/index'
import Layout from './layout/index'


const games = [
  {name: 'Fast Counting', game: <FastCounting/>},
  {name: 'Order Numbers', game: <OrderNumbers/>},
]

function App() {
  return (
    <StylesProvider  injectFirst>
      <Layout
        games={games}
      />
    </StylesProvider >
  );
}

export default App;
