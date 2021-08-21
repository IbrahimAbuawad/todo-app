import React, { useEffect, useState, useContext } from 'react';

import { SettingsContext } from '../context/Settings'
import { AuthContext } from '../context/ContextAuth';
import useForm from '../../hooks/form';
import Header from '../Header/Header';
import Lists from '../lists/Lists';
import Footer from '../footer/Footer';
import Form from '../form/Form';
import superagent from 'superagent';
import axios from "axios";

const ToDo = () => {
  const settings = useContext(SettingsContext);
  const { loggedIn, user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);
  const API = 'https://api-js401.herokuapp.com/api/v1/todo';



  async function addItem(item) {
    const data = {

      text: item.text,
      assignee: item.assignee,
      difficulty: item.difficulty,
      complete: false
    };

    try {
      await superagent.post(`${API}`).send(data)


      const getResponse = await superagent.get(`${API}`);
      setList(JSON.parse(getResponse.text).results);
    }
    catch (error) {
      console.error()
    }
    // localStorage.setItem('List', JSON.stringify([...list, data]));
    // setList(JSON.parse(localStorage.getItem('List')));


  }


  function deleteItem(id) {
    if (loggedIn && user.capabilities.includes('delete')) {

      list.map(async e => {
        if (e._id === id) {
          await axios.delete(`${API}/${id}`);
          const data = await axios.get(`${API}`);
          setList(data.data.results);

        }
      })
    }
    else {
      window.alert('You can not remove items');
    }


  }
  // let newList = [];

  // list.map((e, idx) => {
  //   if (idx !== id) newList.push(e);
  //   return 0;

  // })
  // localStorage.setItem('List', JSON.stringify(newList));
  // setList(JSON.parse(localStorage.getItem('List')));

  //yes

  async function toggleComplete(id) {
    if (loggedIn && user.capabilities.includes('update')) {

      try {
        // const getResponse = await superagent.get(`${API}`);
        list.map(async e => {
          if (e._id === id) {
            let data = {
              'complete': !e.complete
            }
            await axios.put(`${API}/${id}`, data);
            const data1 = await axios.get(`${API}`);
            setList(data1.data.results)
          }

        })

      }
      catch {
        console.error();
      }
    }
    else {
      window.alert('You can not change it')
    }
  }
  // const items = list.map((item, idx) => {
  //   if (idx === id) {
  //    return !item.complete;

  // return item;
  // setList(items);
  // localStorage.setItem('List', JSON.stringify(list))




  // })

  useEffect(() => {

    const currentStorage = localStorage.getItem('currentStorage');
    if (currentStorage) {
      settings.setItemNumber(Number(currentStorage));
    }
    // const localStorageList = JSON.parse(localStorage.getItem('List'))
    // if (localStorageList) {
    //   setList(localStorageList)
    // }
    (async () => {
      try {

        const getResponse = await superagent.get(`${API}`);
        setList(JSON.parse(getResponse.text).results);
      }
      catch (error) {
        console.error()
      }
    })()


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

  useEffect(() => {
   
    (async () => {
      try {

        const getResponse = await axios.get(`${API}`);
        setList(getResponse.data.results);
      }
      catch (error) {
        console.error()
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  function clear() {
    // localStorage.clear();
    // setList([])

    list.map(async e => {
     await axios.delete(`${API}/${e._id}`);
    })
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
