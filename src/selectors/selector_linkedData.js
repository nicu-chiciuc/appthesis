// Reselect selector
// Takes a list of posts and post Ids, and picks out
// the selected Posts
import _ from 'lodash';
import { createSelector } from 'reselect';


const getPosts = (dataX, dataY, dataRad, year) => {
	if (dataX.length == 0 || dataY.length == 0 || dataRad.length == 0)
		return []


	const yearX = dataX.years[year]
	const yearY = dataY.years[year]
	const yearRad = dataRad.years[year]

	const keys = Object.keys(yearX)

	const combined = keys.map(key => ({
		name: key,
		x: yearX[key],
		y: yearY[key],
		r: yearRad[key],
	}))

	return combined

};

export default createSelector(
  ({graph}) => graph.dataX,
  ({graph}) => graph.dataY,
  ({graph}) => graph.dataRad,
  ({graph}) => graph.currentYear,


  getPosts // last argument is the function that has our select logic
);
