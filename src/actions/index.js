import axios from 'axios'
import {FETCH_DATA_X, CHANGE_YEAR} from '../constants/action_types'


export function justdoit (type, fileName) {

	const change = {
		'test01.json': 1,
		'test02.json': 2,
		'test03.json': 3,
		'test04.json': 4,
		'test_color.json': 5,
	}		

	// d3.csv("./src/data.csv", onDataGet)
	const request = axios.get('/api/something/' + change[fileName])


	return {
		type: type,
		payload: request
	}
}

export function changeYear (newYear) {
	console.log('inside changeYear action')

	return {
		type: CHANGE_YEAR,
		value: newYear
	}
}