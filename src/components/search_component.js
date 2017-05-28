import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TextField from 'material-ui/TextField'

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import {searchEntities} from '../actions/index.js'

class SearchForm extends Component {
	constructor (props) {
		super(props)
		this.state = {searchStr: ''}
	}

	render () {
		return (
			<div>
				<TextField 
					hintText="Search for some institutions"
					onChange={(err, val) => this.setState({searchStr: val})}
				/>

				<RaisedButton onTouchTap={() => this.props.onSubmit(this.state.searchStr)}>Search</RaisedButton>
			</div>
		)
	}
}

class SearchComponent extends Component {
	getHeader () {
		return (
			<TableHeader>
				<TableRow>
					<TableHeaderColumn>Entity</TableHeaderColumn>
					<TableHeaderColumn>Region</TableHeaderColumn>
					<TableHeaderColumn>Institution type</TableHeaderColumn>
				</TableRow>
			</TableHeader>
		)
	}

	onSearchPressed = (value) => {
		this.props.searchEntities(value)
	}

	makeRow (entity) {
		return (
			<TableRow key={entity.id} selected={false}>
				<TableRowColumn>{entity.name_ro}</TableRowColumn>
				<TableRowColumn>{entity.region_name_ro}</TableRowColumn>
				<TableRowColumn>{entity.institution_type_name_ro}</TableRowColumn>
			</TableRow>
		)
	}

	render () {
		console.log(this.props.searchedEntities)

		return (
			<Paper>

				<SearchForm
					onSubmit={this.onSearchPressed}
				/>
				
				<Table 
					selectable={false}
					multiSelectable={false}
					onRowSelection={this._onRowSelection}					
					>
					{this.getHeader()}

					<TableBody deselectOnClickaway={false}>
						{this.props.searchedEntities.map(this.makeRow)}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

function mapStateToProps ({searchedEntities}) {
	return {searchedEntities}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({searchEntities}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps) (SearchComponent)