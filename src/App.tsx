import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './App.css';
import { Routes } from './routes/routeConfig';
import { rootReducer, rootSaga } from './states';
import { history } from './states/store';

export const createProvider = (
  reducer: {
    (): import('redux').Reducer<
      import('redux').CombinedState<{
        router: import('connected-react-router').RouterState<
          import('history').History.UnknownFacade
        >;
        rooms: any;
      }>,
      import('redux').AnyAction
    >;
    (arg0: any, arg1: any): any;
  },
  saga: () => Generator<unknown, any, unknown>,
  initialState = {}
) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const compose = composeWithDevTools(applyMiddleware(...middlewares));

  return class AppProvider extends React.Component<
    Readonly<{}>,
    { error: string | null }
  > {
    store: any;
    updater: any;

    constructor(props: Readonly<{}>) {
      super(props);
      this.showError = this.showError.bind(this);
      this.state = { error: null };

      const catchingReducer = (state: any, action: any) => {
        try {
          return reducer(state, action);
        } catch (e) {
          console.error(e);
          this.showError(e);
          return state;
        }
      };

      this.store = createStore(reducer, initialState, compose);
      const sagaTask = sagaMiddleware.run(saga).toPromise();
      sagaTask.catch(this.showError);
    }

    componentDidCatch(error: any) {
      this.showError(error);
    }

    showError(error: any) {
      /*
       * This can be called even before component mounted, since there can be error in the first round of
       * reducer when creating store. And we definitely dont want to create store as late as in componentDidMount.
       * Hence, this small "helper" to simplify architecture. Which is no big deal,
       * its used only for critical error state when app cannot continue anyway.
       */
      if (this.updater.isMounted(this)) {
        this.setState({ error });
      } else {
        this.state = { error };
      }
    }

    render() {
      return <Provider store={this.store}>{this.props.children}</Provider>;
    }
  };
};

// function App(): JSX.Element {
//   return (
//     <Provider store={configureStore()}>
//       <ConnectedRouter history={history}>
//         <BrowserRouter>
//           <ErrorBoundary>
//             <Routes />
//           </ErrorBoundary>
//         </BrowserRouter>
//       </ConnectedRouter>
//     </Provider>
//   );
// }

const App = () => {
  const AppProvider = createProvider(rootReducer, rootSaga);

  return (
    <AppProvider>
      {/* <ConnectedRouter history={history}> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      {/* </ConnectedRouter> */}
    </AppProvider>
  );
};

export default App;
