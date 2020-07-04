import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphQL/config';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
