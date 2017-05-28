import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LinkedDataSelector from '../selectors/selector_linkedData'

import {FETCH_DATA_Y, FETCH_DATA_X, FETCH_DATA_RAD, FETCH_DATA_COLOR} from '../constants/action_types'


import {justdoit, changeYear} from '../actions/index.js'

import d3Chart from '../d3Chart'


class ChartComponent extends Component {
	componentDidMount () {
		this.d3Chart = new d3Chart()

		this.d3Chart.create(this.node)
		this.d3Chart.init()	


		this.d3Chart.update(this.props.data, this.props.selectedEntities, this.props.labelX, this.props.labelY)

		this.props.justdoit(FETCH_DATA_X, 'test01.json')
		this.props.justdoit(FETCH_DATA_Y, 'test02.json')
		this.props.justdoit(FETCH_DATA_RAD, 'test03.json')
		this.props.justdoit(FETCH_DATA_COLOR, 'test_color.json')
	}

	componentDidUpdate () {
		console.log('componentDidUpdate', this.props)
		this.d3Chart.update(this.props.data, this.props.selectedEntities, this.props.labelX, this.props.labelY)
	}

	render () {
		return <div ref={node => this.node = node}></div>
	}
}

function mapStateToProps (state) {
	return {
		data: LinkedDataSelector(state),
		labelX: state.graph.dataX.indicator ? state.graph.dataX.indicator.name : 'no label',
		labelY: state.graph.dataY.indicator ? state.graph.dataY.indicator.name : 'no label',

		currentYear: state.graph.currentYear,
		selectedEntities: state.graph.selectedEntities,
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({changeYear, justdoit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent)