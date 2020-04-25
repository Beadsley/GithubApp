import React from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import './App.css';
import PieChart from './components/PieChart';
import ErrorAlert from './components/ErrorMessage';

function App() {
  return (
    <div className='App'>
      <PrimaryAppBar />
      <ErrorAlert />
      <PieChart />
    </div>
  );
}

export default App;
