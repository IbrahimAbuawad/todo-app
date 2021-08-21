import React from 'react'
import { Button, Card, Elevation, Switch } from '@blueprintjs/core';

function Lists(props) {
  

  return (
    <Card key={props.idx} style={{ width: '20rem' }} id={props.idx}  elevation={Elevation.THREE}>
      {!props.item.complete &&
        <>
          <h5>{props.item.text}</h5>
          <p><small>Assigned to: {props.item.assignee}</small></p>
          <p><small>Difficulty: {props.item.difficulty}</small></p>
        </>
      }
      <Switch onClick={() => props.toggleComplete(props.idx)}>Complete: {props.item.complete.toString()}</Switch>
      <Button intent='danger' onClick={() => props.deleteItem(props.idx)}>X</Button>

    </Card>
  )
}

export default Lists
