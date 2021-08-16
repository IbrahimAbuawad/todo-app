import { FormGroup, InputGroup, Button, Card } from '@blueprintjs/core';


const ToDo = (props) => {


  return (
    <>
    <Card elevation={3} style={{width:'35rem',margin:'auto'}}>
      <form>
        <header>
          <h3>To Do List: {props.incomplete} items pending</h3>
        </header>

        <FormGroup
          // inline={true}
          helperText="Choose any item you want"
          label="To Do Item"
          labelFor="item-details"

        >
          <InputGroup name="text" id="item-details" placeholder="Item Details" onChange={props.handleChange} />
        </FormGroup>
        <FormGroup
          // inline={true}
          helperText="Choose person name"
          label="Assigned To"
          labelFor="Assignee-Name"

        >
          <InputGroup name="assignee" id="Assignee-Name" placeholder="Assignee Name" onChange={props.handleChange} />
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

        <Button intent='success' onClick={props.handleSubmit}>click here</Button>

      </form>
      </Card>

    </>
  );
};

export default ToDo;
