import { combineReducers } from 'redux';

import DataReducer from './reducer_data'

export const FETCH_DATA_Y = 'FETCH_DATA_Y'
export const FETCH_DATA_X = 'FETCH_DATA_X'
export const FETCH_DATA_RAD = 'FETCH_DATA_RAD'

const rootReducer = combineReducers({
  graph: combineReducers({
  	dataX: DataReducer(FETCH_DATA_X),
  	dataY: DataReducer(FETCH_DATA_Y),
  	dataRad: DataReducer(FETCH_DATA_RAD),
  	currentYear: () => 2016,
  })

});

export default rootReducer;
