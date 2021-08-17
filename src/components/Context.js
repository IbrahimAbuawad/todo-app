import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
  const [hide] = useState(false);
  const [itemNumber] = useState(3);
  const [sort] = useState(''); 
  return (
    <SettingsContext.Provider value={{ hide, itemNumber, sort }}>
      {props.children}
    </SettingsContext.Provider>
  )
}