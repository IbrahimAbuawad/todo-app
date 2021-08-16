
import React, { useEffect, useState } from 'react';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import ToDo from './components/todo/todo.js';
import useForm from '../src/hooks/form';
import { v4 as uuid } from 'uuid';
import Lists from './components/todo/Lists';



function App() {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
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

    const items = list.map((item,idx) => {
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

  return (
    <>
      <ToDo
        incomplete={incomplete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Lists
        list={list}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </>
  )
}

export default App
