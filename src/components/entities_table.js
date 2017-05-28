import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LinkedDataSelector from '../selectors/selector_linkedData'

import {sendTheEntities} from '../actions/index'


import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'

import Paper from 'material-ui/Paper'


class EntitiesTable extends Component {
	getHeader () {
		return (
			<TableHeader>
				<TableRow>
					<TableHeaderColumn>Entity</TableHeaderColumn>
					<TableHeaderColumn>X coordinate</TableHeaderColumn>
					<TableHeaderColumn>Y coordinate</TableHeaderColumn>
					<TableHeaderColumn>Radius</TableHeaderColumn>
					<TableHeaderColumn>Color</TableHeaderColumn>
				</TableRow>
			</TableHeader>
		)
	}

	getTableRow = (entity) => {

		return (
			<TableRow key={entity.name} selected={this.props.selectedEntities.includes(entity.name)}>
				<TableRowColumn>{entity.name}</TableRowColumn>
				<TableRowColumn>{entity.x}</TableRowColumn>
				<TableRowColumn>{entity.y}</TableRowColumn>
				<TableRowColumn>{entity.r}</TableRowColumn>
				<TableRowColumn>{entity.color}</TableRowColumn>
			</TableRow>
		)
	}

	_onRowSelection = (rowNumbers) => {
		const namesOfEntities = rowNumbers.map(num => this.props.entitiesData[num].name)

		this.props.sendTheEntities(namesOfEntities)
	}

	render () {
		return (
			<Paper>
				<Table 
					selectable={true}
					multiSelectable={true}
					onRowSelection={this._onRowSelection}
					
					>
					{this.getHeader()}

					<TableBody deselectOnClickaway={false}>
						{this.props.entitiesData.map(this.getTableRow)
					}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

function mapStateToProps (state) {
	return {
		entitiesData: LinkedDataSelector(state),
		selectedEntities: state.graph.selectedEntities
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({sendTheEntities}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (EntitiesTable)