import React, { useEffect, useState, useContext } from 'react';

import { SettingsContext } from '../Context'
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import Header from '../Header/Header';
import Lists from '../Lists';
import Footer from '../Footer';
import  Form  from '../Form';


const ToDo = () => {
  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);




   function addItem(item) {
    const data = {
      id: uuid(),
      text: item.text,
      assignee: item.assignee,
      difficulty: item.difficulty,
      complete: false,
    };
    localStorage.setItem('List', JSON.stringify([...list, data]));
    setList(JSON.parse(localStorage.getItem('List')));


  }


  function deleteItem(id) {
    let newList = [];

    list.map((e, idx) => {
      if (idx !== id) newList.push(e);
      return 0;

    })
    localStorage.setItem('List', JSON.stringify(newList));
    setList(JSON.parse(localStorage.getItem('List')));

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
    localStorage.setItem('List', JSON.stringify(list))

  }
  useEffect(() => {
    const currentStorage = localStorage.getItem('currentStorage');
    if (currentStorage) {
      settings.setItemNumber(Number(currentStorage));
    }
    const localStorageList = JSON.parse(localStorage.getItem('List'))
    if (localStorageList) {
      setList(localStorageList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);


  useEffect(() => {
    setStartIndex(0);
    setEndIndex(settings.itemNumber)
    localStorage.setItem('storage', Number(settings.itemNumber));
    const storage = localStorage.getItem('storage');
    localStorage.setItem('currentStorage', storage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.itemNumber])



  function clear() {
    localStorage.clear();
    setList([])
  }

  function pagination() {
    let result = list.slice(startIndex, endIndex);
    return result;

  }

  function next() {
    setStartIndex(startIndex + settings.itemNumber);//5
    setEndIndex(endIndex + settings.itemNumber);//10
  }

  function previous() {
    setStartIndex(startIndex - settings.itemNumber);//0
    setEndIndex(endIndex - settings.itemNumber);//5
  }
  function handlePaginationChange(e) {
    settings.setItemNumber(e.target.value);
  }


  return (
    <>
      <Header incomplete={incomplete} />

      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handlePaginationChange={handlePaginationChange}
        clear={clear}
      />

      <br></br>
      {pagination().map((item, idx) => (
        <>

          <br></br>
          <Lists
            item={item}
            idx={idx}
            deleteItem={deleteItem}
            toggleComplete={toggleComplete}
          />

        </>

      ))}
      <Footer
        next={next}
        previous={previous}
      />

    </>
  );
};

export default ToDo;
