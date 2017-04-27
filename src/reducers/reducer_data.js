import {FETCH_DATA} from '../actions/index'

import {csvParse} from 'd3-dsv'
import * as d3 from 'd3' 


function mixTheData (data) {


	return d3.shuffle(data)
		.slice(0, 5+Math.floor(Math.random() * (data.length-5)))
		.sort((a, b) => a.date - b.date)
}

export default (DataType) => (state=[], action) => {
	console.log('inreducer', state)

	switch (action.type) {
		case DataType:
			const data = action.payload.data

			return data
	}
	
	return state
}