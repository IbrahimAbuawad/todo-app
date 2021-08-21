import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
  const [hide] = useState(false);
  const [itemNumber,setItemNumber] = useState(3);
  const [sort] = useState(''); 
  return (
    <SettingsContext.Provider value={{ hide, itemNumber, sort,setItemNumber }}>
      {props.children}
    </SettingsContext.Provider>
  )
}