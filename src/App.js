import React from 'react';
import logo from './logo.svg';
import './App.css';
import GroupSizesColors from './components/simpleCalc/index'
import CountingGame from './components/countingGame/index'

function App() {
  return (
    <div className="App">
      <GroupSizesColors/>
      <CountingGame/>
    </div>
  );
}

export default App;
