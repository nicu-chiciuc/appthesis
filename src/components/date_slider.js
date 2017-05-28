import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Slider from 'material-ui/Slider'

import {changeYear} from '../actions/index'

class DateSlider extends Component {
	render () {
		const steps = this.props.maxYear - this.props.minYear
		const step =  1 / steps

		const changeIt = (evt, value) => {
			const newYear = Math.round(value*steps + this.props.minYear)

			this.props.changeYear(newYear)
		}

		return (
			<div>
				<span> {this.props.currentYear} </span>
				<Slider step={step} onChange={changeIt}/>
			</div>
		)
	}
}

function mapStateToProps ({graph: {currentYear, minYear, maxYear}}) {
	return {
		currentYear, minYear, maxYear
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({changeYear}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSlider)