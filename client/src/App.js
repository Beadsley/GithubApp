import React from 'react';
import PrimarySearchAppBar from './components/AppBar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import PieChart from './components/PieChart';
import rootReducer from "./reducers/rootReducer";


const store = createStore(
  rootReducer,
  undefined /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <PrimarySearchAppBar />
        <PieChart />
      </div>
    </Provider>
  );
}

export default App;
