import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import App from './components/app';
import reducers from './reducers';


// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
// const theStore = createStoreWithMiddleware(reducers)

const logMiddleware = ({getShape, dispatch}) => (next) => (action) => {
	console.log(`Action ${action.type}`, action)

	next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const theStore = createStore(reducers, /* preloadedState, */ composeEnhancers(
	applyMiddleware(logMiddleware, ReduxPromise, logMiddleware)
))

ReactDOM.render(
  <Provider store={theStore}>
  	<MuiThemeProvider>
    	<App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
