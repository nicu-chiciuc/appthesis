import {SEARCH_ENTITIES} from '../constants/action_types'


export default (state = [], action) => {
	console.log(action.type, SEARCH_ENTITIES)

	if (action.type === SEARCH_ENTITIES) {
		return action.payload.data
	}

	return state
}