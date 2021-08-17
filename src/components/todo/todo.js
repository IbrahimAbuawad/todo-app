import { FormGroup, InputGroup, Button, Card, Elevation, Switch } from '@blueprintjs/core';
import React, { useEffect, useState, useContext } from 'react';

import { SettingsContext } from '../Context'
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import Header from '../Header/Header';


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
    
    localStorage.setItem('List', JSON.stringify(list))
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


  useEffect(() => {
    setStartIndex(0);
    setEndIndex(settings.itemNumber)

  }, [settings.itemNumber])

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('List'))){
      setList(JSON.parse(localStorage.getItem('List')))
    }
    
    return ()=>{
      let localList = JSON.parse(localStorage.getItem('List'))
      console.log(localList)
      setList(localList);
    }
   
  },[])

  function clear(){
    localStorage.clear();
    setList([])
  }

  function pagination() {
    let result = list.slice(startIndex, endIndex);
    return result;

  }

  function next() {
    setStartIndex(startIndex + settings.itemNumber - 1);
    setEndIndex(endIndex + settings.itemNumber);
  }

  function previous() {
    setStartIndex(startIndex - settings.itemNumber);
    setEndIndex(endIndex - settings.itemNumber);
  }
  function handlePaginationChange(e) {
    settings.setItemNumber(e.target.value);
  }


  return (
    <>
      <Header incomplete={incomplete} />

      <Card elevation={3} style={{ width: '35rem', margin: 'auto' }}>
        <form>


          <FormGroup
            // inline={true}
            helperText="Choose any item you want"
            label="To Do Item"
            labelFor="item-details"

          >
            <InputGroup name="text" id="item-details" placeholder="Item Details" onChange={handleChange} autoComplete='off' />
          </FormGroup>
          <FormGroup
            // inline={true}
            helperText="Choose person name"
            label="Assigned To"
            labelFor="Assignee-Name"

          >
            <InputGroup name="assignee" id="Assignee-Name" placeholder="Assignee Name" onChange={handleChange} autoComplete='off' />
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
              onChange={handlePaginationChange}
            />

          </FormGroup>
          <Button intent='success' onClick={handleSubmit}>click here</Button>
          <Button style={{marginLeft:'10px'}} intent='danger' onClick={clear}>Clear List</Button>

        </form>
      </Card>
      <br></br>
      {pagination().map((item, idx) => (
        <>

          <br></br>

          <Card vertical={true} style={{ width: '20rem' }} id={idx} interactive={true} elevation={Elevation.THREE}>
            {!item.complete &&
              <>
                <h5>{item.text}</h5>
                <p><small>Assigned to: {item.assignee}</small></p>
                <p><small>Difficulty: {item.difficulty}</small></p>
              </>
            }
            <Switch onClick={() => toggleComplete(idx)}>Complete: {item.complete.toString()}</Switch>
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
