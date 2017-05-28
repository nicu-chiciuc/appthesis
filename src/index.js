import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxPromise from 'redux-promise'
import createSagaMiddleware from 'redux-saga'

import App from './components/app'
import reducers from './reducers'

const logMiddleware = ({getShape, dispatch}) => (next) => (action) => {
	console.log(`Action ${action.type}`, action)

	next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const theStore = createStore(reducers, /* preloadedState, */ composeEnhancers(
	applyMiddleware(ReduxPromise, logMiddleware, createSagaMiddleware())
))

ReactDOM.render(
	<Provider store={theStore}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>
	, document.querySelector('.container')
)
