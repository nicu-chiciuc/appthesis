import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ChartComponent from '../components/chart_component'
import EntitiesTable from '../components/entities_table'
import DateSlider from '../components/date_slider'
import DataSelection from '../components/data_selection'
import SearchComponent from '../components/search_component'

import {sendGetAvailableIndicators} from '../actions'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap, from material-ui installation docs
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class App extends Component {
	componentDidMount () {
		this.props.sendGetAvailableIndicators()
	}

	render() {
		return (
			<div>
				<ChartComponent />
				<DateSlider />
				<DataSelection />
				<SearchComponent />
				<br/>
				<EntitiesTable />
			</div>
		)
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({sendGetAvailableIndicators}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(App)