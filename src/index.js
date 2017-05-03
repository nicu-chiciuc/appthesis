import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import App from './components/app';
import reducers from './reducers';


import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap, from material-ui installation docs
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const theStore = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={theStore}>
  	<MuiThemeProvider>
    	<App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
