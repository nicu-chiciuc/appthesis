import { combineReducers } from 'redux'

import DataReducer from './reducer_data'
import SearchedEntitiesReducer from './reducer_searched_entities'

import {
	FETCH_DATA_Y, FETCH_DATA_X, FETCH_DATA_RAD, FETCH_DATA_COLOR,
	CHANGE_YEAR,
	SELECT_ENTITIES

} from '../constants/action_types'

function YearReducer (state = 2007, action) {
	console.log('YearReducer', state)

	if (action.type === CHANGE_YEAR)
		return action.value

	return state
}

function SelectedEntitiesReducers (state = [], action) {
	if (action.type === SELECT_ENTITIES) {
		return [...action.newSelectedEntities]
	}

	return state
}

const rootReducer = combineReducers({
	graph: combineReducers({
		dataX: DataReducer(FETCH_DATA_X),
		dataY: DataReducer(FETCH_DATA_Y),
		dataRad: DataReducer(FETCH_DATA_RAD),
		dataColor: DataReducer(FETCH_DATA_COLOR),

		minYear: () => 2005,
		maxYear: () => 2010,

		currentYear: YearReducer,

		selectedEntities: SelectedEntitiesReducers,
		searchedEntities: SearchedEntitiesReducer,
	})

})

export default rootReducer
