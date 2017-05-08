import _ from 'lodash'
// remove jquery
import $ from 'jquery'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LinkedDataSelector from '../selectors/selector_linkedData'

import {FETCH_DATA_Y, FETCH_DATA_X, FETCH_DATA_RAD} from '../reducers/index.js'

import RaisedButton from 'material-ui/RaisedButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap, from material-ui installation docs
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



import {justdoit} from '../actions/index.js'

import d3Chart from '../d3Chart'

import * as d3 from 'd3'


class TestComponent extends Component {
	componentWillMount () {
		
		
	}

	componentDidMount () {

		const self = this

		var el = ReactDOM.findDOMNode(this);
		this.d3Chart = new d3Chart()

		this.d3Chart.create(el)
		this.d3Chart.init()	


		this.d3Chart.update(this.props.data, this.props.labelX, this.props.labelY)

		this.props.justdoit(FETCH_DATA_X, 'test01.json')
		this.props.justdoit(FETCH_DATA_Y, 'test02.json')
		this.props.justdoit(FETCH_DATA_RAD, 'test03.json')
	}

	updateData () {
		// console.log('upateData called')

		this.props.justdoit(FETCH_DATA_X, 'test02.json')
		this.props.justdoit(FETCH_DATA_Y, 'test03.json')
		this.props.justdoit(FETCH_DATA_RAD, 'test04.json')
	}

	componentDidUpdate () {
		console.log('componentDidUpdate', this.props)
		this.d3Chart.update(this.props.data, this.props.labelX, this.props.labelY)
	}

	makeNumber (oneData) {
	}

	render () {
		// console.log(this.props)

		const style = {
		  margin: 12,
		};

		return (
			<div>	
				<RaisedButton label="Default" style={style} onTouchTap={this.updateData.bind(this)}/>
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
	}

	return obj
}

function mapDispatchToProps (dispatch) {
	return {justdoit: (...args) => dispatch(justdoit(...args))}

	// return bindActionCreators({justdoit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)