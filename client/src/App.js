import React from 'react';
import './App.css';
import PieChart from './components/PieChart.js';
import PrimarySearchAppBar from './components/AppBar.js';

function App() {
  return (
    <div className='App'>
      <PrimarySearchAppBar />
      <PieChart />
    </div>
  );
}

export default App;
