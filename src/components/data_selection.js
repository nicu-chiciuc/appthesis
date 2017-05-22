import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'material-ui/TextField'

class DataSelection extends Component {
	onChange (event, string) {
		console.log(string)
	}

	render () {
		return (
			<div>
				<TextField
					hintText="Search"
					onChange={this.onChange}
				/><br />

				<SelectField
					floatingLabelText="Entities Type"
					value={1}
					onChange={this.handleChange}
				>
					<MenuItem value={1} primaryText="Schools" />
					<MenuItem value={2} primaryText="City" />
				</SelectField>
			</div>
		)
	}
}


function mapStateToProps (state) {
	return {}
}

function mapDispatchToProps (dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection)