import React, {Component} from 'react'
import {connect} from 'react-redux'

import LinkedDataSelector from '../selectors/selector_linkedData'


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class EntitiesTable extends Component {
  getHeader () {
    console.log('getHeader called')

    return (
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Entity</TableHeaderColumn>
          <TableHeaderColumn>X coordinate</TableHeaderColumn>
          <TableHeaderColumn>Y coordinate</TableHeaderColumn>
          <TableHeaderColumn>Radius</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  getTableRow (entity) {
    return (
      <TableRow key={entity.name}>
        <TableRowColumn>{entity.name}</TableRowColumn>
        <TableRowColumn>{entity.x}</TableRowColumn>
        <TableRowColumn>{entity.y}</TableRowColumn>
        <TableRowColumn>{entity.r}</TableRowColumn>
      </TableRow>
    )
  }

  render () {

    console.log(this.props.entitiesData)

    return (
      <Table>
        {this.getHeader()}

        <TableBody>
          {this.props.entitiesData.map(this.getTableRow)}
        </TableBody>
      </Table>
    )
  }
}

function mapStateToProps (state) {
  return {entitiesData: LinkedDataSelector(state)}
}

export default connect(mapStateToProps, undefined) (EntitiesTable)