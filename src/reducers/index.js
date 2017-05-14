import { combineReducers } from 'redux';

import DataReducer from './reducer_data'

import {
	FETCH_DATA_Y, FETCH_DATA_X, FETCH_DATA_RAD, FETCH_DATA_COLOR,
	CHANGE_YEAR} from '../constants/action_types'

function YearReducer (state = 2014, action) {
	console.log('YearReducer', state)

	if (action.type == CHANGE_YEAR)
		return action.value

	return state
}

const rootReducer = combineReducers({
  graph: combineReducers({
  	dataX: DataReducer(FETCH_DATA_X),
  	dataY: DataReducer(FETCH_DATA_Y),
  	dataRad: DataReducer(FETCH_DATA_RAD),
  	dataColor: DataReducer(FETCH_DATA_COLOR),

  	minYear: () => 2014,
  	maxYear: () => 2017,

  	currentYear: YearReducer,
  })

});

export default rootReducer
