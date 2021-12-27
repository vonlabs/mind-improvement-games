import React from 'react';
import './App.css';
import { StylesProvider  } from '@material-ui/core/styles';

import GroupSizesColors from './components/simpleCalc/index'
import FastCounting from './components/fastCounting/index'
import Layout from './layout/index'


const games = [
  {name: 'Fast Counting', game: <FastCounting/>},
  {name: 'Order Numbers', game: <GroupSizesColors/>},
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
