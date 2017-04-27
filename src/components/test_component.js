import _ from 'lodash'
// remove jquery
import $ from 'jquery'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LinkedDataSelector from '../selectors/selector_linkedData'

import {FETCH_DATA_Y, FETCH_DATA_X} from '../reducers/index.js'


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


		console.log('from reselector: ', this.props.data)

		this.d3Chart.update(this.props.data)

		self.props.justdoit(FETCH_DATA_X, 'test01.json')
		self.props.justdoit(FETCH_DATA_Y, 'test02.json')

		$('svg').click(() => {
			self.props.justdoit(FETCH_DATA_X, 'test02.json')
			self.props.justdoit(FETCH_DATA_Y, 'test03.json')
		})
	}

	componentDidUpdate () {
		console.log('console did update', this.props.data)
		this.d3Chart.update(this.props.data)
	}

	makeNumber (oneData) {
	}

	render () {
		console.log(this.props)

		return (
			<div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {data: LinkedDataSelector(state)}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({justdoit: justdoit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)