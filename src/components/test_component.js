import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LinkedDataSelector from '../selectors/selector_linkedData'

import {FETCH_DATA_Y, FETCH_DATA_X, FETCH_DATA_RAD, FETCH_DATA_COLOR} from '../constants/action_types'

import RaisedButton from 'material-ui/RaisedButton'


import {justdoit, changeYear} from '../actions/index.js'

import d3Chart from '../d3Chart'


class TestComponent extends Component {
	componentWillMount () {
		
		
	}

	componentDidMount () {
		var el = ReactDOM.findDOMNode(this)
		this.d3Chart = new d3Chart()

		this.d3Chart.create(el)
		this.d3Chart.init()	


		this.d3Chart.update(this.props.data, this.props.selectedEntities, this.props.labelX, this.props.labelY)

		this.props.justdoit(FETCH_DATA_X, 'test01.json')
		this.props.justdoit(FETCH_DATA_Y, 'test02.json')
		this.props.justdoit(FETCH_DATA_RAD, 'test03.json')
		this.props.justdoit(FETCH_DATA_COLOR, 'test_color.json')
	}

	updateData () {
		// console.log('upateData called')

		this.props.justdoit(FETCH_DATA_X, 'test02.json')
		this.props.justdoit(FETCH_DATA_Y, 'test03.json')
		this.props.justdoit(FETCH_DATA_RAD, 'test04.json')
	}

	increaseYear () {
		this.props.changeYear(this.props.currentYear + 1)
	}

	componentDidUpdate () {
		console.log('componentDidUpdate', this.props)
		this.d3Chart.update(this.props.data, this.props.selectedEntities, this.props.labelX, this.props.labelY)
	}

	handleChange (a) {
		console.log('changed', a)
	}

	render () {
		const style = {
			margin: 12,
		}

		return (
			<div>	
				<RaisedButton label="Change" style={style} onTouchTap={this.updateData.bind(this)}/>
				<RaisedButton label="Increase Year" style={style} onTouchTap={this.increaseYear.bind(this)}/>

				
			</div>
		)
	}
}

function mapStateToProps (state) {

	console.log('mapStateToProps', state)

	const obj = {
		data: LinkedDataSelector(state),
		labelX: state.graph.dataX.indicator ? state.graph.dataX.indicator.name : 'no label',
		labelY: state.graph.dataY.indicator ? state.graph.dataY.indicator.name : 'no label',

		currentYear: state.graph.currentYear,
		selectedEntities: state.graph.selectedEntities,
	}

	return obj
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({changeYear, justdoit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)