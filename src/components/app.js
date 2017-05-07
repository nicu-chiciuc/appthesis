import React, { Component } from 'react';

import * as d3 from 'd3'

import TestComponent from '../components/test_component'
import StupidTable from '../components/entities_table'

export default class App extends Component {
  render() {
  	console.log(d3)

	return (
		<div>
			<div>React simple starter</div>
			<TestComponent />
			<StupidTable />
		</div>
	);
  }
}
