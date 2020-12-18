import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routes } from './routes/routeConfig';
import configureStore, { history } from './states/store';

function App(): JSX.Element {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
