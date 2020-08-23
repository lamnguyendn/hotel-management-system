import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Routes } from './routes/routeConfig';
import configureStore from './states/store';

function App(): JSX.Element {
  return (
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  );
}

export default App;
