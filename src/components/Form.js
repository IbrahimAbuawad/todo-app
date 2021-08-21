import React from 'react'
import { FormGroup, InputGroup, Button, Card} from '@blueprintjs/core';

function Lists(props) {

    return (
        <Card elevation={3} style={{ width: '35rem', margin: 'auto' }}>
        <form>


          <FormGroup
            // inline={true}
            helperText="Choose any item you want"
            label="To Do Item"
            labelFor="item-details"

          >
            <InputGroup name="text" id="item-details" placeholder="Item Details" onChange={props.handleChange} autoComplete='off' />
          </FormGroup>
          <FormGroup
            // inline={true}
            helperText="Choose person name"
            label="Assigned To"
            labelFor="Assignee-Name"

          >
            <InputGroup name="assignee" id="Assignee-Name" placeholder="Assignee Name" onChange={props.handleChange} autoComplete='off' />
          </FormGroup >
          <FormGroup
            // inline={true}
            label="difficulty"
            labelFor="item-details"

          >
            <InputGroup
              name="difficulty"
              id="difficulty"
              type='range'
              placeholder="Assignee Name"
              min={0}
              max={5}
              initialValue={3}
              labelStepSize={5}
              onChange={props.handleChange}
            />

          </FormGroup>
          <FormGroup
            // inline={true}
            label="items per screen"
            labelFor="items per screen"
          >
            <InputGroup
              name="items_per_screen"
              id="items_per"
              type='range'
              min={1}
              max={5}
              initialValue={3}
              labelStepSize={1}
              onChange={props.handlePaginationChange}
            />

          </FormGroup>
          <Button intent='success' onClick={props.handleSubmit}>click here</Button>
          <Button style={{ marginLeft: '10px' }} intent='danger' onClick={props.clear}>Clear List</Button>

        </form>
      </Card>
    )
}

export default Lists
