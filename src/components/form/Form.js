import React, { useContext} from 'react'
import { FormGroup, InputGroup, Button, Card } from '@blueprintjs/core';
import { AuthContext } from '../context/ContextAuth';


function Form(props) {
  const { user } = useContext(AuthContext);

 

 
  return (
    <>
      {user.type==='admin' &&
        <Card elevation={3} style={{ width: '35rem', margin: 'auto' }}>
          <form>


            <FormGroup
              helperText="Choose any item you want"
              label="To Do Item"
              labelFor="item-details"

            >
              <InputGroup name="text" id="item-details" placeholder="Item Details" onChange={props.handleChange} autoComplete='off' />
            </FormGroup>
            <FormGroup
              helperText="Choose person name"
              label="Assigned To"
              labelFor="Assignee-Name"

            >
              <InputGroup name="assignee" id="Assignee-Name" placeholder="Assignee Name" onChange={props.handleChange} autoComplete='off' />
            </FormGroup >
            <FormGroup
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
                onChange={props.handleChange}
              />

            </FormGroup>
            <FormGroup
              label="items per screen"
              labelFor="items per screen"
            >
              <InputGroup
                name="items_per_screen"
                id="items_per"
                type='range'
                min={1}
                max={5}
                onChange={props.handlePaginationChange}
              />

            </FormGroup>
            <Button intent='success' onClick={props.handleSubmit}>click here</Button>
            <Button style={{ marginLeft: '10px' }} intent='danger' onClick={props.clear}>Clear List</Button>

          </form>
        </Card>

      }
    </>
  )
}

export default Form
