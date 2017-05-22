import {FETCH_SEARCHED_ENTITIES} from '../actions/index'


export default (state = [], action) => {
	if (action.type === FETCH_SEARCHED_ENTITIES) {
		return []
	}

	return state
}