import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'

import TextField from 'material-ui/TextField'

import {changeIndicator} from '../actions'
import {
	DATA_X,
	DATA_Y,
	DATA_RAD,
	DATA_COLOR,
} from '../constants/action_types'

class DataSelection extends Component {
	onChange (event, string) {
		console.log(string)
	}

	getMenuItem (indicator) {
		return (
			<MenuItem key={indicator.amenity_id} value={indicator.amenity_id} primaryText={indicator.amenity_name_ro}/>
		)
	}

	onIndicatorChange = (event, key, payload) => {
		this.props.changeIndicator(DATA_X, payload)
		console.log(event, key, payload)
	}

	render () {
		console.log(this.props.indicatorData)

		return (
			<div>
				<SelectField
					floatingLabelText="Entities Type"
					value={1}
					onChange={this.handleChange}
				>
					<MenuItem value={1} primaryText="Schools" />
					<MenuItem value={2} primaryText="City" />
				</SelectField>

				<SelectField
					floatingLabelText="Indicator for X values"
					onChange={this.onIndicatorChange}
				>
					{this.props.indicatorData.availableIndicators.map(this.getMenuItem)}
				</SelectField>

			</div>
		)
	}
}


function mapStateToProps ({indicatorData}) {
	return {indicatorData}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({changeIndicator}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection)