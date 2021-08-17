
import React from 'react';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import SettingsProvider from './components/Context';
import ToDo from './components/todo/todo';



function App() {

  
  return (

    <SettingsProvider>
      <ToDo/>
    </SettingsProvider>

  )
}

export default App
