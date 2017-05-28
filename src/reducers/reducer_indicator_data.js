import {
	SEARCH_INDICATORS,
	FETCH_DATA,
	DATA_X,
	DATA_Y,
	DATA_RAD,
	DATA_COLOR,

} from '../constants/action_types'

const initialState = {
	availableIndicators: [],
	dataX: [],
}

export default (state = initialState, action) => {
	console.log(action.type, SEARCH_INDICATORS)

	if (action.type === FETCH_DATA) {
		console.log(action.type)
	}

	else if (action.type === SEARCH_INDICATORS) {
		return {...state, availableIndicators: action.payload.data}
	}

	return state
}