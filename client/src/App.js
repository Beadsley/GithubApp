import React from 'react';
import PrimarySearchAppBar from './components/AppBar';
import './App.css';
import PieChart from './components/PieChart';

function App() {
  return (
    <div className='App'>
      <PrimarySearchAppBar />
      <PieChart />
    </div>
  );
}

export default App;
