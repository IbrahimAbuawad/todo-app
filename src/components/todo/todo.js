import { FormGroup, InputGroup, Button, Card, Elevation, Callout } from '@blueprintjs/core';
import React, { useEffect, useState, useContext } from 'react';

import { SettingsContext } from '../Context'
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';


const ToDo = () => {

  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);


  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }


  function deleteItem(id) {
    let newList = [];

    list.map((e, idx) => {
      if (idx !== id) newList.push(e);
      return 0;

    })
    setList(newList)
  }
  //yes

  function toggleComplete(id) {

    const items = list.map((item, idx) => {
      if (idx === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);



  function pagination() {
    let result = list.slice(startIndex, endIndex);
    return result;
  }

  function next() {
    setStartIndex(startIndex + settings.itemNumber);
    setEndIndex(endIndex + settings.itemNumber);
  }

  function previous() {
    setStartIndex(startIndex - settings.itemNumber);
    setEndIndex(endIndex - settings.itemNumber);
  }



  return (
    <>
      <Callout interactive={false} elevation={Elevation.TWO}>
        <header>
          <h3>To Do List: {incomplete} items pending</h3>
        </header>
      </Callout>

      <Card elevation={3} style={{ width: '35rem', margin: 'auto' }}>
        <form>


          <FormGroup
            // inline={true}
            helperText="Choose any item you want"
            label="To Do Item"
            labelFor="item-details"

          >
            <InputGroup name="text" id="item-details" placeholder="Item Details" onChange={handleChange} />
          </FormGroup>
          <FormGroup
            // inline={true}
            helperText="Choose person name"
            label="Assigned To"
            labelFor="Assignee-Name"

          >
            <InputGroup name="assignee" id="Assignee-Name" placeholder="Assignee Name" onChange={handleChange} />
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
              onChange={handleChange}
            />

          </FormGroup>

          <Button intent='success' onClick={handleSubmit}>click here</Button>

        </form>
      </Card>
      <br></br>
      {pagination().map((item, idx) => (
        <>

<br></br>

          <Card vertical={true} style={{ width: '20rem' }} id={item.id} interactive={true} elevation={Elevation.THREE}>
            {!item.complete &&
              <>
                <h5>{item.text}</h5>
                <p><small>Assigned to: {item.assignee}</small></p>
                <p><small>Difficulty: {item.difficulty}</small></p>
              </>
            }
            <div onClick={() => toggleComplete(idx)}>Complete: {item.complete.toString()}</div>
            <Button intent='danger' onClick={() => deleteItem(idx)}>X</Button>
          </Card>
        </>

      ))}

      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
};

export default ToDo;
