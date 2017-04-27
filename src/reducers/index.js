import { combineReducers } from 'redux';

import DataReducer from './reducer_data'

export const FETCH_DATA_Y = 'FETCH_DATA_Y'
export const FETCH_DATA_X = 'FETCH_DATA_X'

const rootReducer = combineReducers({
  graph: combineReducers({
  	dataX: DataReducer(FETCH_DATA_X),
  	dataY: DataReducer(FETCH_DATA_Y),
  	currentYear: () => 2016,
  }) 

});

export default rootReducer;
