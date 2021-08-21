import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
  const [hide] = useState(false);
  const [itemNumber,setItemNumber] = useState(3);
  const [sort] = useState(''); 


  // let login = async (username, password) => {
  //   try {
  //     const response = await superagent
  //       .post(`${API}/signin`)
  //       .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);

  //     validateToken(response.body.token);
  //   } catch (error) {
  //       window.alert('Username OR Password is Incorrect')
  //   }
  // };

  return (
    <SettingsContext.Provider value={{ hide, itemNumber, sort,setItemNumber }}>
      {props.children}
    </SettingsContext.Provider>
  )
}