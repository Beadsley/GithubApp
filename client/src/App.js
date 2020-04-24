import React from 'react';
import SearchAppBar from './components/SearchAppBar';
import './App.css';
import PieChart from './components/PieChart';
import ErrorAlert from './components/ErrorMessage';

function App() {
  return (
    <div className='App'>
      <SearchAppBar />
      <ErrorAlert />
      <PieChart />
    </div>
  );
}

export default App;
