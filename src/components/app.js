import React, { Component } from 'react';

import * as d3 from 'd3'

import TestComponent from '../components/test_component'
import EntitiesTable from '../components/entities_table'
import DateSlider from '../components/date_slider'
import DataSelection from '../components/data_selection'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap, from material-ui installation docs
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  render() {
  	console.log(d3)

	return (
		<div>
			<div>React simple starter</div>
			<TestComponent />
			<DateSlider />
			<DataSelection />
			<EntitiesTable />
		</div>
	)
  }
}
