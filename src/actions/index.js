import axios from 'axios'
import {FETCH_DATA_X} from '../reducers/index.js'


export function justdoit (type, fileName) {

	

	// d3.csv("./src/data.csv", onDataGet)
	const request = axios.get('./src/data/' + fileName)


	return {
		type: type,
		payload: request
	}



}